'use client'

import { Suspense, useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Shield, LogOut, Dog, Hotel, Car } from 'lucide-react'
import './admin.css'
import { DaycareManager } from '@/components/admin/daycare-manager'
import { PetHotelManager } from '@/components/admin/pet-hotel-manager'
import { VanManager } from '@/components/admin/van-manager'
import { AdminFooter } from '@/components/admin/admin-footer'

type ServiceType = 'daycare' | 'pethotel' | 'van'
type TabType = 'dates' | 'hours'

function AdminPageContent() {
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF0F7] via-[#FFF9FC] to-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
        
        <Card className="w-full max-w-md shadow-xl border-0 bg-white/95 backdrop-blur-sm relative z-10">
          <CardHeader className="text-center space-y-6 pb-8 pt-12">
            <div className="flex flex-col items-center gap-4">
              <Image 
                src="/images/pinkdog_original_no_txt.png" 
                alt="PinkDog Logo" 
                width={80}
                height={80}
                className="drop-shadow-md"
              />
              <div className="space-y-2">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">
                  PinkDog Pet Resort
                </h1>
                <p className="text-sm text-gray-600 font-medium tracking-wide uppercase">
                  Admin Portal
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="token" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-pink-500" />
                  Access Token
                </Label>
                <Input
                  id="token"
                  type="password"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="Enter admin token"
                  className="h-12 text-base border-pink-200 focus:border-pink-400 focus:ring-pink-400 bg-pink-50/30"
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
                className="w-full h-12 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Image 
                src="/images/pinkdog_original_no_txt.png" 
                alt="PinkDog Logo" 
                width={48}
                height={48}
              />
              <div>
                <h1 className="text-xl font-semibold text-gray-800">Admin Panel</h1>
                <p className="text-xs text-gray-600">Manage your services</p>
              </div>
            </div>
            <Button 
              onClick={handleLogout} 
              variant="outline" 
              className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        <Tabs value={activeService} onValueChange={handleServiceChange}>
          <TabsList className="grid w-full grid-cols-3 mb-4 bg-gray-100/50 rounded-lg p-1">
            <TabsTrigger 
              value="daycare" 
              className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm rounded-md transition-all duration-200 font-medium"
            >
              <Dog className="w-4 h-4 mr-2" />
              Daycare
            </TabsTrigger>
            <TabsTrigger 
              value="pethotel" 
              className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm rounded-md transition-all duration-200 font-medium"
            >
              <Hotel className="w-4 h-4 mr-2" />
              Pet Hotel
            </TabsTrigger>
            <TabsTrigger 
              value="van" 
              className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm rounded-md transition-all duration-200 font-medium"
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

      {/* Admin Footer */}
      <AdminFooter />
    </div>
  )
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <AdminPageContent />
    </Suspense>
  )
}