import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const service = searchParams.get('service')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    const where: any = {}
    
    if (service) {
      where.OR = [
        { service: service },
        { service: null } // null means blocked for all services
      ]
    }
    
    if (startDate && endDate) {
      where.date = {
        gte: new Date(startDate),
        lte: new Date(endDate)
      }
    }

    const blockedDates = await prisma.blockedDate.findMany({
      where,
      orderBy: { date: 'asc' }
    })
    
    return NextResponse.json(blockedDates)
  } catch (error) {
    console.error('Error fetching blocked dates:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}