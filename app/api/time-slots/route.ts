import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma'

const prisma = new PrismaClient()

// GET - Fetch available time slots (public endpoint)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const service = searchParams.get('service')
    const slotType = searchParams.get('slotType')
    
    if (!service) {
      return NextResponse.json({ error: 'Service parameter is required' }, { status: 400 })
    }

    const where: { service: string; isActive: boolean; slotType?: string } = { 
      service,
      isActive: true 
    }
    
    if (slotType) {
      where.slotType = slotType
    }
    
    const timeSlots = await prisma.timeSlotConfig.findMany({
      where,
      select: {
        service: true,
        slotType: true,
        timeSlots: true
      }
    })

    // Transform the data to a more convenient format
    const result = timeSlots.reduce((acc: Record<string, unknown>, config) => {
      if (!acc[config.slotType]) {
        acc[config.slotType] = config.timeSlots
      }
      return acc
    }, {})

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error fetching time slots:', error)
    return NextResponse.json({ error: 'Failed to fetch time slots' }, { status: 500 })
  }
}