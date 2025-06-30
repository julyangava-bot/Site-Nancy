import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const ADMIN_TOKEN = process.env.ADMIN_API_TOKEN || 'your-secret-admin-token-here'

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader || authHeader !== `Bearer ${ADMIN_TOKEN}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const blockedDates = await prisma.blockedDate.findMany({
      orderBy: { date: 'asc' }
    })
    
    return NextResponse.json(blockedDates)
  } catch (error) {
    console.error('Error fetching blocked dates:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader || authHeader !== `Bearer ${ADMIN_TOKEN}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { date, startTime, endTime, isFullDay, reason, service } = body

    // Parse date string to create date at noon UTC to avoid timezone issues
    const [year, month, day] = date.split('-').map(Number)
    const dateToSave = new Date(Date.UTC(year, month - 1, day, 12, 0, 0))
    
    const blockedDate = await prisma.blockedDate.create({
      data: {
        date: dateToSave,
        startTime,
        endTime,
        isFullDay: isFullDay ?? false,
        reason,
        service
      }
    })
    
    return NextResponse.json(blockedDate, { status: 201 })
  } catch (error) {
    console.error('Error creating blocked date:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader || authHeader !== `Bearer ${ADMIN_TOKEN}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    await prisma.blockedDate.delete({
      where: { id }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting blocked date:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}