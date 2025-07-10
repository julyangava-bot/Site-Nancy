'use client'

import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DayPicker } from 'react-day-picker'
import { Switch } from '@/components/ui/switch'
import { Calendar, Clock, Trash2, Plus, AlertCircle, Loader2 } from 'lucide-react'
import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'
import 'react-day-picker/dist/style.css'

interface BlockedDate {
  id: string
  date: string
  isFullDay: boolean
  reason: string | null
  service: string | null
  createdAt: string
  updatedAt: string
}

interface TimeSlot {
  value: string
  label: string
}

interface ServiceManagerBaseProps {
  token?: string // Make optional for now, will remove later
  service: string
  serviceLabel: string
  serviceIcon: React.ReactNode
  activeTab: string
  onTabChange: (tab: string) => void
  timeSlotTypes: {
    type: string
    label: string
    addLabel: string
  }[]
}

export function ServiceManagerBase({
  token,
  service,
  serviceLabel,
  serviceIcon,
  activeTab,
  onTabChange,
  timeSlotTypes,
}: ServiceManagerBaseProps) {
  // Blocked Dates State
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [reason, setReason] = useState('')
  const [loading, setLoading] = useState(false)

  // Time Slots State
  const [timeSlots, setTimeSlots] = useState<Record<string, TimeSlot[]>>({})
  const [activeSlots, setActiveSlots] = useState<Record<string, boolean>>({})
  const [timeInputs, setTimeInputs] = useState<Record<string, string>>({})
  const [savingSlots, setSavingSlots] = useState(false)

  useEffect(() => {
    fetchBlockedDates()
    fetchTimeSlots()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service])

  // Blocked Dates Functions
  const fetchBlockedDates = async () => {
    try {
      const response = await fetch(`/api/admin/blocked-dates?service=${service}`)
      
      if (response.ok) {
        const data = await response.json()
        setBlockedDates(data.filter((d: BlockedDate) => d.service === service))
      }
    } catch (error) {
      console.error('Error fetching blocked dates:', error)
    }
  }

  const handleAddBlockedDate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDate) return

    setLoading(true)
    try {
      // Ensure we're working with the date at noon to avoid timezone issues
      const dateAtNoon = new Date(selectedDate)
      dateAtNoon.setHours(12, 0, 0, 0)
      
      const year = dateAtNoon.getFullYear()
      const month = String(dateAtNoon.getMonth() + 1).padStart(2, '0')
      const day = String(dateAtNoon.getDate()).padStart(2, '0')
      const dateString = `${year}-${month}-${day}`
      
      const response = await fetch('/api/admin/blocked-dates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          date: dateString,
          startTime: null,
          endTime: null,
          isFullDay: true,
          reason,
          service
        })
      })

      if (response.ok) {
        fetchBlockedDates()
        setReason('')
        setSelectedDate(undefined)
      }
    } catch (error) {
      console.error('Error adding blocked date:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteBlockedDate = async (id: string) => {
    if (!confirm('Are you sure you want to remove this block?')) return

    try {
      const response = await fetch(`/api/admin/blocked-dates?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        fetchBlockedDates()
      }
    } catch (error) {
      console.error('Error deleting blocked date:', error)
    }
  }

  // Time Slots Functions
  const fetchTimeSlots = async () => {
    try {
      const response = await fetch(`/api/admin/time-slots?service=${service}`)
      
      if (response.ok) {
        const data = await response.json()
        const slotsMap: Record<string, TimeSlot[]> = {}
        const activeMap: Record<string, boolean> = {}
        
        data.forEach((config: {
          slotType: string
          timeSlots: TimeSlot[]
          isActive: boolean
        }) => {
          slotsMap[config.slotType] = config.timeSlots || []
          activeMap[config.slotType] = config.isActive
        })
        
        setTimeSlots(slotsMap)
        setActiveSlots(activeMap)
      }
    } catch (error) {
      console.error('Error fetching time slots:', error)
    }
  }

  const saveTimeSlots = async (slotType: string, slots: TimeSlot[], isActive: boolean) => {
    setSavingSlots(true)
    try {
      const response = await fetch('/api/admin/time-slots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          service,
          slotType,
          timeSlots: slots,
          isActive
        })
      })

      if (response.ok) {
        fetchTimeSlots()
      }
    } catch (error) {
      console.error('Error saving time slots:', error)
    } finally {
      setSavingSlots(false)
    }
  }

  const handleAddTimeSlot = (slotType: string) => {
    const inputValue = timeInputs[slotType]
    if (!inputValue) return
    
    const currentSlots = timeSlots[slotType] || []
    
    let newSlot: TimeSlot
    
    if (slotType === 'service_type') {
      // For service types, use the input as is
      newSlot = {
        value: inputValue.toLowerCase().replace(/\s+/g, '_'),
        label: inputValue
      }
    } else {
      // For time slots, format as time
      const [hours, minutes] = inputValue.split(':')
      const date = new Date()
      date.setHours(parseInt(hours), parseInt(minutes))
      
      newSlot = {
        value: inputValue,
        label: format(date, 'h:mm a')
      }
    }
    
    const newSlots = [...currentSlots, newSlot].sort((a, b) => 
      a.value.localeCompare(b.value)
    )
    
    saveTimeSlots(slotType, newSlots, activeSlots[slotType] ?? true)
    setTimeInputs({ ...timeInputs, [slotType]: '' })
  }

  const handleRemoveTimeSlot = (slotType: string, index: number) => {
    const currentSlots = timeSlots[slotType] || []
    const newSlots = [...currentSlots]
    newSlots.splice(index, 1)
    saveTimeSlots(slotType, newSlots, activeSlots[slotType] ?? true)
  }

  const handleToggleActive = (slotType: string) => {
    const currentSlots = timeSlots[slotType] || []
    const newActive = !(activeSlots[slotType] ?? true)
    saveTimeSlots(slotType, currentSlots, newActive)
  }

  return (
    <Tabs value={activeTab} onValueChange={onTabChange}>
      <TabsList className="grid w-full grid-cols-2 mb-4 bg-gray-100/50 rounded-lg p-1">
        <TabsTrigger 
          value="dates" 
          className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm rounded-md transition-all duration-200 font-medium"
        >
          <Calendar className="w-4 h-4 mr-2" />
          Blocked Dates
        </TabsTrigger>
        <TabsTrigger 
          value="hours" 
          className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm rounded-md transition-all duration-200 font-medium"
        >
          <Clock className="w-4 h-4 mr-2" />
          Service Hours
        </TabsTrigger>
      </TabsList>

      {/* Blocked Dates Tab */}
      <TabsContent value="dates" className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Add Blocked Date */}
          <div className="bg-white rounded-xl p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-pink-500" />
                Block Date for {serviceLabel}
              </h3>
            </div>
            <div>
              <form onSubmit={handleAddBlockedDate} className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Select Date</Label>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <DayPicker
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => {
                        if (date) {
                          // Set the time to noon to avoid timezone issues
                          const dateAtNoon = new Date(date)
                          dateAtNoon.setHours(12, 0, 0, 0)
                          setSelectedDate(dateAtNoon)
                        } else {
                          setSelectedDate(undefined)
                        }
                      }}
                      locale={enUS}
                      disabled={(date) => {
                        // Disable past dates
                        const today = new Date()
                        today.setHours(0, 0, 0, 0)
                        if (date < today) return true
                        
                        // Check if date is already blocked
                        const dateStr = format(date, 'yyyy-MM-dd')
                        return blockedDates.some(blocked => {
                          let blockedDateStr = blocked.date
                          if (blocked.date.includes('T')) {
                            blockedDateStr = blocked.date.split('T')[0]
                          }
                          return blockedDateStr === dateStr && blocked.isFullDay
                        })
                      }}
                      modifiers={{
                        blocked: (date) => {
                          const dateStr = format(date, 'yyyy-MM-dd')
                          return blockedDates.some(blocked => {
                            let blockedDateStr = blocked.date
                            if (blocked.date.includes('T')) {
                              blockedDateStr = blocked.date.split('T')[0]
                            }
                            return blockedDateStr === dateStr && blocked.isFullDay
                          })
                        }
                      }}
                      modifiersStyles={{
                        selected: { 
                          backgroundColor: '#ec4899',
                          color: 'white'
                        },
                        today: {
                          fontWeight: 'bold',
                          color: '#ec4899'
                        },
                        blocked: {
                          backgroundColor: '#fca5a5',
                          color: '#991b1b',
                          fontWeight: 'bold',
                          textDecoration: 'line-through'
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reason">Reason (optional)</Label>
                  <Input
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="e.g., Maintenance, Full capacity"
                    className="border-gray-200 focus:border-pink-400 focus:ring-pink-400"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={loading || !selectedDate} 
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white disabled:opacity-50 transition-all duration-200 font-medium"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    'Add Block'
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Blocked Dates List */}
          <div className="bg-white rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Blocks</h3>
            <div>
              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {(() => {
                  const futureBlockedDates = blockedDates.filter((blocked) => {
                    try {
                      // Extract just the date part (YYYY-MM-DD) from the stored date
                      let dateOnly = blocked.date
                      if (blocked.date.includes('T')) {
                        dateOnly = blocked.date.split('T')[0]
                      }
                      
                      // Parse as local date by adding time at noon to avoid timezone issues
                      const [year, month, day] = dateOnly.split('-').map(Number)
                      const blockedDate = new Date(year, month - 1, day, 12, 0, 0)
                      
                      // Get today's date at start of day
                      const today = new Date()
                      today.setHours(0, 0, 0, 0)
                      
                      // Keep dates that are today or in the future
                      return blockedDate >= today
                    } catch (error) {
                      console.error('Date filter error:', error, blocked.date)
                      return true // Keep date if we can't parse it
                    }
                  })

                  if (futureBlockedDates.length === 0) {
                    return (
                      <div className="text-center py-12">
                        <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">No blocked dates</p>
                      </div>
                    )
                  }

                  return futureBlockedDates.map((blocked) => (
                    <div
                      key={blocked.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {serviceIcon}
                          <p className="font-semibold text-gray-800">
                            {(() => {
                              try {
                                // Extract just the date part (YYYY-MM-DD) from the stored date
                                let dateOnly = blocked.date
                                if (blocked.date.includes('T')) {
                                  dateOnly = blocked.date.split('T')[0]
                                }
                                
                                // Parse as local date
                                const [year, month, day] = dateOnly.split('-').map(Number)
                                const date = new Date(year, month - 1, day)
                                
                                // Check if date is valid
                                if (isNaN(date.getTime())) {
                                  return blocked.date // Fallback to raw date string
                                }
                                
                                return format(date, "MMMM dd, yyyy", { locale: enUS })
                              } catch (error) {
                                console.error('Date format error:', error, blocked.date)
                                return blocked.date // Fallback to raw date string
                              }
                            })()}
                          </p>
                        </div>
                        {blocked.reason && (
                          <p className="text-sm text-gray-600 ml-6">
                            {blocked.reason}
                          </p>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteBlockedDate(blocked.id)}
                        className="hover:bg-red-50 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                })()}
              </div>
            </div>
          </div>
        </div>
      </TabsContent>

      {/* Service Hours Tab */}
      <TabsContent value="hours" className="space-y-6">
        <div className="bg-white rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-pink-500" />
            {serviceLabel} Hours Management
          </h3>
          <div>
            <div className="space-y-6">
              {timeSlotTypes.map((slotType) => (
                <div key={slotType.type} className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">{slotType.label}</h3>
                    <Switch
                      checked={activeSlots[slotType.type] ?? true}
                      onCheckedChange={() => handleToggleActive(slotType.type)}
                      className="data-[state=checked]:bg-pink-500"
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Input
                      type={slotType.type === 'service_type' ? 'text' : 'time'}
                      value={timeInputs[slotType.type] || ''}
                      onChange={(e) => setTimeInputs({ ...timeInputs, [slotType.type]: e.target.value })}
                      placeholder={slotType.type === 'service_type' ? 'e.g., Grooming' : undefined}
                      className="flex-1 border-gray-200 focus:border-pink-400 focus:ring-pink-400"
                    />
                    <Button 
                      onClick={() => handleAddTimeSlot(slotType.type)} 
                      disabled={savingSlots}
                      className="bg-pink-500 hover:bg-pink-600 text-white"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      {slotType.addLabel}
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {(timeSlots[slotType.type] || []).map((slot, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                        <span className="font-medium text-gray-700">{slot.label}</span>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleRemoveTimeSlot(slotType.type, index)}
                          className="hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    {(timeSlots[slotType.type] || []).length === 0 && (
                      <p className="text-sm text-gray-500 text-center py-2">No time slots configured</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800">
                  <p className="font-medium mb-1">Important:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Changes take effect immediately</li>
                    <li>Disabled time slots won&apos;t appear in booking forms</li>
                    <li>Times are displayed in 12-hour format</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}