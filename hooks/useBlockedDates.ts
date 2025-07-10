import { useState, useEffect } from 'react'
import { format } from 'date-fns'

interface BlockedDate {
  id: string
  date: string
  startTime: string | null
  endTime: string | null
  isFullDay: boolean
  reason: string | null
  service: string | null
}

export function useBlockedDates(service?: string) {
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlockedDates()
  }, [service])

  const fetchBlockedDates = async () => {
    try {
      const params = new URLSearchParams()
      if (service) params.append('service', service)
      
      const response = await fetch(`/api/blocked-dates?${params.toString()}`)
      if (response.ok) {
        const data = await response.json()
        setBlockedDates(data)
      }
    } catch (error) {
      console.error('Error fetching blocked dates:', error)
    } finally {
      setLoading(false)
    }
  }

  const isDateBlocked = (date: Date): boolean => {
    const dateStr = format(date, 'yyyy-MM-dd')
    
    return blockedDates.some(blocked => {
      // Extract just the date part if it includes time
      let blockedDateStr = blocked.date
      if (blocked.date.includes('T')) {
        blockedDateStr = blocked.date.split('T')[0]
      }
      
      return blockedDateStr === dateStr && blocked.isFullDay
    })
  }

  const isTimeBlocked = (date: Date, time: string): boolean => {
    const dateStr = format(date, 'yyyy-MM-dd')
    
    return blockedDates.some(blocked => {
      // Extract just the date part if it includes time
      let blockedDateStr = blocked.date
      if (blocked.date.includes('T')) {
        blockedDateStr = blocked.date.split('T')[0]
      }
      
      if (blockedDateStr !== dateStr) return false
      
      if (blocked.isFullDay) return true
      
      if (blocked.startTime && blocked.endTime) {
        const [hours, minutes] = time.split(':').map(Number)
        const timeMinutes = hours * 60 + minutes
        
        const [startHours, startMinutes] = blocked.startTime.split(':').map(Number)
        const startMinutesTotal = startHours * 60 + startMinutes
        
        const [endHours, endMinutes] = blocked.endTime.split(':').map(Number)
        const endMinutesTotal = endHours * 60 + endMinutes
        
        return timeMinutes >= startMinutesTotal && timeMinutes <= endMinutesTotal
      }
      
      return false
    })
  }

  const getBlockedTimesForDate = (date: Date): string[] => {
    const dateStr = format(date, 'yyyy-MM-dd')
    const blockedTimes: string[] = []
    
    blockedDates.forEach(blocked => {
      // Extract just the date part if it includes time
      let blockedDateStr = blocked.date
      if (blocked.date.includes('T')) {
        blockedDateStr = blocked.date.split('T')[0]
      }
      
      if (blockedDateStr !== dateStr) return
      
      if (blocked.isFullDay) {
        // Return all possible times for full day block
        for (let h = 0; h < 24; h++) {
          for (let m = 0; m < 60; m += 30) {
            blockedTimes.push(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`)
          }
        }
      } else if (blocked.startTime && blocked.endTime) {
        const [startHours, startMinutes] = blocked.startTime.split(':').map(Number)
        const [endHours, endMinutes] = blocked.endTime.split(':').map(Number)
        
        const startMinutesTotal = startHours * 60 + startMinutes
        const endMinutesTotal = endHours * 60 + endMinutes
        
        for (let totalMinutes = startMinutesTotal; totalMinutes <= endMinutesTotal; totalMinutes += 30) {
          const h = Math.floor(totalMinutes / 60)
          const m = totalMinutes % 60
          blockedTimes.push(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`)
        }
      }
    })
    
    return [...new Set(blockedTimes)]
  }

  return {
    blockedDates,
    loading,
    isDateBlocked,
    isTimeBlocked,
    getBlockedTimesForDate,
    refetch: fetchBlockedDates
  }
}