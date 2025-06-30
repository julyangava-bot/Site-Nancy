'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Trash2, Calendar as CalendarIcon, Clock, Shield } from 'lucide-react'
import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'
import './admin.css'

interface BlockedDate {
  id: string
  date: string
  isFullDay: boolean
  reason: string | null
  service: string | null
  createdAt: string
  updatedAt: string
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [token, setToken] = useState('')
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  // Always block full day - isFullDay is always true
  const [reason, setReason] = useState('')
  const [service, setService] = useState<string>('all')
  const [loading, setLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check localStorage first, then sessionStorage
    const savedToken = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken')
    if (savedToken) {
      setToken(savedToken)
      setIsAuthenticated(true)
      fetchBlockedDates(savedToken)
    }
    
    // Check if remember me was previously selected
    const savedRemember = localStorage.getItem('adminRememberMe')
    if (savedRemember === 'true') {
      setRememberMe(true)
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simple validation - in production, you'd validate against the server
    if (token === 'pinkdog-admin-secret-token-2025') {
      // Save token based on remember me preference
      if (rememberMe) {
        localStorage.setItem('adminToken', token)
        localStorage.setItem('adminRememberMe', 'true')
      } else {
        sessionStorage.setItem('adminToken', token)
        localStorage.removeItem('adminRememberMe')
      }
      setIsAuthenticated(true)
      fetchBlockedDates(token)
    } else {
      alert('Invalid token')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminRememberMe')
    sessionStorage.removeItem('adminToken')
    setIsAuthenticated(false)
    setToken('')
    router.push('/')
  }

  const fetchBlockedDates = async (authToken: string) => {
    try {
      const response = await fetch('/api/admin/blocked-dates', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setBlockedDates(data)
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
      // Create date string in YYYY-MM-DD format to avoid timezone issues
      const year = selectedDate.getFullYear()
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
      const day = String(selectedDate.getDate()).padStart(2, '0')
      const dateString = `${year}-${month}-${day}`
      
      const response = await fetch('/api/admin/blocked-dates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          date: dateString,
          startTime: null,
          endTime: null,
          isFullDay: true,
          reason,
          service: service === 'all' ? null : service
        })
      })

      if (response.ok) {
        fetchBlockedDates(token)
        // Reset form
        setReason('')
        setService('all')
      }
    } catch (error) {
      console.error('Error adding blocked date:', error)
      alert('Error adding blocked date')
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
        fetchBlockedDates(token)
      }
    } catch (error) {
      console.error('Error deleting blocked date:', error)
      alert('Error removing block')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-pink-100">
        <Card className="w-full max-w-md shadow-xl border-0">
          <CardHeader className="text-center space-y-4 pb-8">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-[#E73992] to-pink-600 rounded-full flex items-center justify-center">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Admin Panel</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="token" className="text-sm font-medium text-gray-700">Access Token</Label>
                <Input
                  id="token"
                  type="password"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="Enter admin token"
                  className="h-12 text-base"
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-[#E73992] bg-gray-100 border-gray-300 rounded focus:ring-[#E73992] focus:ring-2"
                />
                <Label htmlFor="rememberMe" className="text-sm text-gray-600 cursor-pointer select-none">
                  Remember me
                </Label>
              </div>
              <Button type="submit" className="w-full h-12 bg-[#E73992] hover:bg-[#d3337f] text-white font-semibold">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8 bg-white rounded-2xl shadow-lg p-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Manage Blocked Dates</h1>
            <p className="text-gray-600 mt-1">Control available dates and times for bookings</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="border-2 hover:bg-gray-50">
            Logout
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Add new blocked date */}
          <Card className="shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-[#E73992] to-pink-600 text-white">
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                Add New Block
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleAddBlockedDate} className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4" />
                    Select Date
                  </Label>
                  <div className="border rounded-lg p-3 bg-white">
                    <DayPicker
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      locale={enUS}
                      disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                      modifiersStyles={{
                        selected: { 
                          backgroundColor: '#E73992',
                          color: 'white'
                        },
                        today: {
                          fontWeight: 'bold',
                          fontSize: '120%'
                        }
                      }}
                    />
                  </div>
                  {selectedDate && (
                    <p className="text-sm text-gray-600">
                      Selected date: {format(selectedDate, "MMMM dd, yyyy", { locale: enUS })}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service" className="text-sm font-medium text-gray-700">Service</Label>
                  <Select value={service} onValueChange={setService}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">🌟 All Services</SelectItem>
                      <SelectItem value="daycare">🏠 Daycare</SelectItem>
                      <SelectItem value="pethotel">🏨 Pet Hotel</SelectItem>
                      <SelectItem value="van">🚐 Van</SelectItem>
                    </SelectContent>
                  </Select>
                </div>


                <div className="space-y-2">
                  <Label htmlFor="reason" className="text-sm font-medium text-gray-700">Reason (optional)</Label>
                  <Input
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="e.g. Maintenance, Full capacity, Holiday"
                    className="h-12"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={loading || !selectedDate} 
                  className="w-full h-12 bg-[#E73992] hover:bg-[#d3337f] text-white font-semibold disabled:opacity-50"
                >
                  {loading ? 'Adding...' : 'Add Block'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* List of blocked dates */}
          <Card className="shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-gray-700 to-gray-900 text-white">
              <CardTitle>Active Blocks</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {blockedDates.length === 0 ? (
                  <div className="text-center py-12">
                    <CalendarIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">
                      No blocked dates
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Add blocks using the form on the left
                    </p>
                  </div>
                ) : (
                  blockedDates.map((blocked) => (
                    <div
                      key={blocked.id}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-shadow mb-3"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <CalendarIcon className="w-4 h-4 text-[#E73992]" />
                          <p className="font-semibold text-gray-800">
                            {(() => {
                              try {
                                // Parse the date and format it
                                const date = new Date(blocked.date)
                                // Get UTC date components to avoid timezone shifts
                                const utcDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
                                return format(utcDate, "MMMM dd, yyyy", { locale: enUS })
                              } catch (error) {
                                console.error('Date format error:', error, blocked.date)
                                return 'Invalid date'
                              }
                            })()}
                          </p>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-gray-500" />
                            <span className="text-gray-600">
                              All day
                            </span>
                          </span>
                          <span className="text-gray-600">
                            {blocked.service === 'daycare' && '🏠 Daycare'}
                            {blocked.service === 'pethotel' && '🏨 Pet Hotel'}
                            {blocked.service === 'van' && '🚐 Van'}
                            {!blocked.service && '🌟 All Services'}
                          </span>
                        </div>
                        {blocked.reason && (
                          <p className="text-sm text-gray-500 mt-1 italic">
                            &quot;{blocked.reason}&quot;
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
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}