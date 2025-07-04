'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LogOut, Dog, Hotel, Car } from 'lucide-react'
import { DaycareManager } from '@/components/admin/daycare-manager'
import { PetHotelManager } from '@/components/admin/pet-hotel-manager'
import { VanManager } from '@/components/admin/van-manager'
import { AdminFooter } from '@/components/admin/admin-footer'

type ServiceType = 'daycare' | 'pethotel' | 'van'
type TabType = 'dates' | 'hours'

interface AdminContentProps {
  userEmail: string
}

export function AdminContent({ userEmail }: AdminContentProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Get initial values from URL params
  const initialService = (searchParams.get('service') as ServiceType) || 'daycare'
  const initialTab = (searchParams.get('tab') as TabType) || 'dates'
  
  const [activeService, setActiveService] = useState<ServiceType>(initialService)
  const [activeTab, setActiveTab] = useState<TabType>(initialTab)

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

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/' })
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
                <p className="text-xs text-gray-600">Welcome, {userEmail}</p>
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
              token="" // Token no longer needed with NextAuth
              activeTab={activeTab} 
              onTabChange={handleTabChange}
            />
          </TabsContent>

          <TabsContent value="pethotel" className="space-y-6">
            <PetHotelManager 
              token="" // Token no longer needed with NextAuth
              activeTab={activeTab} 
              onTabChange={handleTabChange}
            />
          </TabsContent>

          <TabsContent value="van" className="space-y-6">
            <VanManager 
              token="" // Token no longer needed with NextAuth
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