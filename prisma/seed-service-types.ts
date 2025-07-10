import { PrismaClient } from '@/lib/generated/prisma'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const prisma = new PrismaClient()

// Helper function to generate time slots with 30-minute intervals
function generateTimeSlots(startHour: number, startMinute: number, endHour: number, endMinute: number): Array<{ value: string; label: string }> {
  const slots = []
  let currentHour = startHour
  let currentMinute = startMinute
  
  while (currentHour < endHour || (currentHour === endHour && currentMinute <= endMinute)) {
    const hours = currentHour.toString().padStart(2, '0')
    const minutes = currentMinute.toString().padStart(2, '0')
    const value = `${hours}:${minutes}`
    
    // Format time for display
    const date = new Date(2000, 0, 1, currentHour, currentMinute)
    const label = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
    
    slots.push({ value, label })
    
    // Increment by 30 minutes
    currentMinute += 30
    if (currentMinute >= 60) {
      currentMinute = 0
      currentHour += 1
    }
  }
  
  return slots
}

async function main() {
  console.log('🌱 Seeding service types...')

  // Default service types for Van service
  const vanServiceTypes = [
    { value: 'grooming', label: 'Grooming' },
    { value: 'daycare', label: 'Daycare' },
    { value: 'boarding', label: 'Boarding' },
    { value: 'other', label: 'Other' }
  ]

  // Create or update Van service types
  await prisma.timeSlotConfig.upsert({
    where: {
      service_slotType: {
        service: 'van',
        slotType: 'service_type'
      }
    },
    update: {
      timeSlots: vanServiceTypes,
      isActive: true,
      updatedAt: new Date()
    },
    create: {
      service: 'van',
      slotType: 'service_type',
      timeSlots: vanServiceTypes,
      isActive: true
    }
  })

  console.log('✅ Van service types seeded')

  // Time slots for Van service (using same format as other services)
  const vanTimeSlots = [
    { value: '08:00', label: '8:00 AM' },
    { value: '09:00', label: '9:00 AM' },
    { value: '10:00', label: '10:00 AM' },
    { value: '11:00', label: '11:00 AM' },
    { value: '12:00', label: '12:00 PM' },
    { value: '13:00', label: '1:00 PM' },
    { value: '14:00', label: '2:00 PM' },
    { value: '15:00', label: '3:00 PM' },
    { value: '16:00', label: '4:00 PM' }
  ]

  await prisma.timeSlotConfig.upsert({
    where: {
      service_slotType: {
        service: 'van',
        slotType: 'time_window'
      }
    },
    update: {
      timeSlots: vanTimeSlots,
      isActive: true,
      updatedAt: new Date()
    },
    create: {
      service: 'van',
      slotType: 'time_window',
      timeSlots: vanTimeSlots,
      isActive: true
    }
  })

  console.log('✅ Van time slots seeded')

  // Time slots for Daycare (same as Pet Hotel)
  // Monday-Saturday: 8:30 AM - 4:30 PM
  // Sunday: 12:00 PM - 4:00 PM
  // We'll store all slots, and the form will filter based on day of week
  const daycareDropOffTimes = generateTimeSlots(8, 30, 16, 30)
  const daycarePickUpTimes = generateTimeSlots(8, 30, 16, 30)

  await prisma.timeSlotConfig.upsert({
    where: {
      service_slotType: {
        service: 'daycare',
        slotType: 'drop_off'
      }
    },
    update: {
      timeSlots: daycareDropOffTimes,
      isActive: true,
      updatedAt: new Date()
    },
    create: {
      service: 'daycare',
      slotType: 'drop_off',
      timeSlots: daycareDropOffTimes,
      isActive: true
    }
  })

  await prisma.timeSlotConfig.upsert({
    where: {
      service_slotType: {
        service: 'daycare',
        slotType: 'pick_up'
      }
    },
    update: {
      timeSlots: daycarePickUpTimes,
      isActive: true,
      updatedAt: new Date()
    },
    create: {
      service: 'daycare',
      slotType: 'pick_up',
      timeSlots: daycarePickUpTimes,
      isActive: true
    }
  })

  console.log('✅ Daycare time slots seeded')

  // Time slots for Pet Hotel
  // Check-in: 12:00 PM - 4:00 PM (30-minute intervals)
  const hotelCheckInTimes = generateTimeSlots(12, 0, 16, 0)
  
  // Check-out: 8:30 AM - 4:30 PM (30-minute intervals)
  const hotelCheckOutTimes = generateTimeSlots(8, 30, 16, 30)

  await prisma.timeSlotConfig.upsert({
    where: {
      service_slotType: {
        service: 'pethotel',
        slotType: 'check_in'
      }
    },
    update: {
      timeSlots: hotelCheckInTimes,
      isActive: true,
      updatedAt: new Date()
    },
    create: {
      service: 'pethotel',
      slotType: 'check_in',
      timeSlots: hotelCheckInTimes,
      isActive: true
    }
  })

  await prisma.timeSlotConfig.upsert({
    where: {
      service_slotType: {
        service: 'pethotel',
        slotType: 'check_out'
      }
    },
    update: {
      timeSlots: hotelCheckOutTimes,
      isActive: true,
      updatedAt: new Date()
    },
    create: {
      service: 'pethotel',
      slotType: 'check_out',
      timeSlots: hotelCheckOutTimes,
      isActive: true
    }
  })

  console.log('✅ Pet Hotel time slots seeded')
  
  // Seed blocked dates for July 3, 4, and 5, 2025
  const blockedDates = [
    new Date('2025-07-03'),
    new Date('2025-07-04'),
    new Date('2025-07-05')
  ]
  
  for (const date of blockedDates) {
    // Block for all services
    const services = ['daycare', 'pethotel', 'van']
    
    for (const service of services) {
      // Check if blocked date already exists
      const existing = await prisma.blockedDate.findFirst({
        where: {
          date: date,
          service: service
        }
      })
      
      if (existing) {
        // Update existing blocked date
        await prisma.blockedDate.update({
          where: {
            id: existing.id
          },
          data: {
            isFullDay: true,
            startTime: null,
            endTime: null,
            reason: 'Holiday closure',
            updatedAt: new Date()
          }
        })
      } else {
        // Create new blocked date
        await prisma.blockedDate.create({
          data: {
            date: date,
            service: service,
            isFullDay: true,
            startTime: null,
            endTime: null,
            reason: 'Holiday closure'
          }
        })
      }
    }
  }
  
  console.log('✅ Blocked dates seeded for July 3, 4, and 5, 2025')
  console.log('🎉 All seeds completed!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })