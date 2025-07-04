import { useState, useEffect } from 'react'

interface TimeSlot {
  value: string
  label: string
}

interface TimeSlotData {
  drop_off?: TimeSlot[]
  pick_up?: TimeSlot[]
  check_in?: TimeSlot[]
  check_out?: TimeSlot[]
  time_window?: TimeSlot[]
  service_type?: TimeSlot[]
}

export function useTimeSlots(service: string) {
  const [timeSlots, setTimeSlots] = useState<TimeSlotData>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTimeSlots()
  }, [service])

  const fetchTimeSlots = async () => {
    try {
      const response = await fetch(`/api/time-slots?service=${service}`)
      if (response.ok) {
        const data = await response.json()
        setTimeSlots(data)
      }
    } catch (error) {
      console.error('Error fetching time slots:', error)
    } finally {
      setLoading(false)
    }
  }

  return {
    timeSlots,
    loading,
    refetch: fetchTimeSlots
  }
}