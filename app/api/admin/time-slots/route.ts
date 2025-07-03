import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma'

const prisma = new PrismaClient()

// Helper function to validate auth token
function validateAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false
  }
  
  const token = authHeader.split(' ')[1]
  return token === process.env.ADMIN_API_TOKEN
}

// GET - Fetch time slot configurations
export async function GET(request: NextRequest) {
  if (!validateAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const service = searchParams.get('service')
    
    const where = service ? { service } : {}
    
    const timeSlots = await prisma.timeSlotConfig.findMany({
      where,
      orderBy: [
        { service: 'asc' },
        { slotType: 'asc' }
      ]
    })

    return NextResponse.json(timeSlots)
  } catch (error) {
    console.error('Error fetching time slots:', error)
    return NextResponse.json({ error: 'Failed to fetch time slots' }, { status: 500 })
  }
}

// POST - Create or update time slot configuration
export async function POST(request: NextRequest) {
  if (!validateAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { service, slotType, timeSlots, isActive } = body

    // Validate required fields
    if (!service || !slotType || !timeSlots) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Validate service
    if (!['daycare', 'pethotel', 'van'].includes(service)) {
      return NextResponse.json({ error: 'Invalid service' }, { status: 400 })
    }

    // Validate slotType based on service
    const validSlotTypes: Record<string, string[]> = {
      daycare: ['drop_off', 'pick_up'],
      pethotel: ['check_in', 'check_out'],
      van: ['time_window']
    }

    if (!validSlotTypes[service].includes(slotType)) {
      return NextResponse.json({ error: 'Invalid slot type for service' }, { status: 400 })
    }

    // Upsert time slot configuration
    const timeSlotConfig = await prisma.timeSlotConfig.upsert({
      where: {
        service_slotType: {
          service,
          slotType
        }
      },
      update: {
        timeSlots,
        isActive: isActive ?? true,
        updatedAt: new Date()
      },
      create: {
        service,
        slotType,
        timeSlots,
        isActive: isActive ?? true
      }
    })

    return NextResponse.json(timeSlotConfig)
  } catch (error) {
    console.error('Error creating/updating time slots:', error)
    return NextResponse.json({ error: 'Failed to save time slots' }, { status: 500 })
  }
}

// PUT - Update time slot configuration
export async function PUT(request: NextRequest) {
  if (!validateAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { id, timeSlots, isActive } = body

    if (!id) {
      return NextResponse.json({ error: 'Missing ID' }, { status: 400 })
    }

    const timeSlotConfig = await prisma.timeSlotConfig.update({
      where: { id },
      data: {
        timeSlots: timeSlots !== undefined ? timeSlots : undefined,
        isActive: isActive !== undefined ? isActive : undefined,
        updatedAt: new Date()
      }
    })

    return NextResponse.json(timeSlotConfig)
  } catch (error) {
    console.error('Error updating time slots:', error)
    return NextResponse.json({ error: 'Failed to update time slots' }, { status: 500 })
  }
}

// DELETE - Delete time slot configuration
export async function DELETE(request: NextRequest) {
  if (!validateAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Missing ID' }, { status: 400 })
    }

    await prisma.timeSlotConfig.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting time slots:', error)
    return NextResponse.json({ error: 'Failed to delete time slots' }, { status: 500 })
  }
}