'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Shield, LogOut, Dog, Hotel, Car } from 'lucide-react'
import './admin.css'
import { DaycareManager } from '@/components/admin/daycare-manager'
import { PetHotelManager } from '@/components/admin/pet-hotel-manager'
import { VanManager } from '@/components/admin/van-manager'

type ServiceType = 'daycare' | 'pethotel' | 'van'
type TabType = 'dates' | 'hours'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [token, setToken] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Get initial values from URL params
  const initialService = (searchParams.get('service') as ServiceType) || 'daycare'
  const initialTab = (searchParams.get('tab') as TabType) || 'dates'
  
  const [activeService, setActiveService] = useState<ServiceType>(initialService)
  const [activeTab, setActiveTab] = useState<TabType>(initialTab)

  useEffect(() => {
    // Check localStorage first, then sessionStorage
    const savedToken = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken')
    if (savedToken) {
      setToken(savedToken)
      setIsAuthenticated(true)
    }
    
    // Check if remember me was previously selected
    const savedRemember = localStorage.getItem('adminRememberMe')
    if (savedRemember === 'true') {
      setRememberMe(true)
    }
  }, [])

  // Update URL when tabs change
  const updateURL = (service: ServiceType, tab: TabType) => {
    const params = new URLSearchParams()
    params.set('service', service)
    params.set('tab', tab)
    router.push(`/admin?${params.toString()}`)
  }

  const handleServiceChange = (value: string) => {
    const service = value as ServiceType
    setActiveService(service)
    updateURL(service, activeTab)
  }

  const handleTabChange = (value: string) => {
    const tab = value as TabType
    setActiveTab(tab)
    updateURL(activeService, tab)
  }

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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF0F7] via-[#FFF9FC] to-white">
        <Card className="w-full max-w-md shadow-lg border border-pink-100 bg-white">
          <CardHeader className="text-center space-y-4 pb-8">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center shadow-md">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">PinkDog Admin</CardTitle>
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
                  className="h-12 text-base border-pink-100 focus:border-pink-400 focus:ring-pink-400"
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-pink-500 bg-gray-100 border-gray-300 rounded focus:ring-pink-400 focus:ring-2"
                />
                <Label htmlFor="rememberMe" className="text-sm text-gray-600 cursor-pointer select-none">
                  Remember me
                </Label>
              </div>
              <Button 
                type="submit" 
                className="w-full h-12 bg-pink-500 hover:bg-pink-600 text-white font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF0F7] via-[#FFF9FC] to-white">
      {/* Header */}
      <div className="bg-white shadow-md border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img 
                src="/images/pinkdog_original_no_txt.png" 
                alt="PinkDog Logo" 
                className="h-12 w-auto"
              />
              <div>
                <h1 className="text-xl font-semibold text-gray-800">Admin Panel</h1>
                <p className="text-xs text-gray-600">Manage your services</p>
              </div>
            </div>
            <Button 
              onClick={handleLogout} 
              variant="outline" 
              className="border-pink-200 text-pink-600 hover:bg-pink-50 hover:border-pink-300 transition-all duration-200"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeService} onValueChange={handleServiceChange}>
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-white shadow-sm border border-pink-100">
            <TabsTrigger 
              value="daycare" 
              className="data-[state=active]:bg-pink-500 data-[state=active]:text-white transition-all duration-200"
            >
              <Dog className="w-4 h-4 mr-2" />
              Daycare
            </TabsTrigger>
            <TabsTrigger 
              value="pethotel" 
              className="data-[state=active]:bg-pink-500 data-[state=active]:text-white transition-all duration-200"
            >
              <Hotel className="w-4 h-4 mr-2" />
              Pet Hotel
            </TabsTrigger>
            <TabsTrigger 
              value="van" 
              className="data-[state=active]:bg-pink-500 data-[state=active]:text-white transition-all duration-200"
            >
              <Car className="w-4 h-4 mr-2" />
              Van Service
            </TabsTrigger>
          </TabsList>

          <TabsContent value="daycare" className="space-y-6">
            <DaycareManager 
              token={token} 
              activeTab={activeTab} 
              onTabChange={handleTabChange}
            />
          </TabsContent>

          <TabsContent value="pethotel" className="space-y-6">
            <PetHotelManager 
              token={token} 
              activeTab={activeTab} 
              onTabChange={handleTabChange}
            />
          </TabsContent>

          <TabsContent value="van" className="space-y-6">
            <VanManager 
              token={token} 
              activeTab={activeTab} 
              onTabChange={handleTabChange}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}