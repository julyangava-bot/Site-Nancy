'use client'

import { Hotel } from 'lucide-react'
import { ServiceManagerBase } from './service-manager-base'

interface PetHotelManagerProps {
  token: string
  activeTab: string
  onTabChange: (tab: string) => void
}

export function PetHotelManager({ token, activeTab, onTabChange }: PetHotelManagerProps) {
  return (
    <ServiceManagerBase
      token={token}
      service="pethotel"
      serviceLabel="Pet Hotel"
      serviceIcon={<Hotel className="w-4 h-4 text-pink-500" />}
      activeTab={activeTab}
      onTabChange={onTabChange}
      timeSlotTypes={[
        {
          type: 'check_in',
          label: 'Check-in Times',
          addLabel: 'Add Check-in'
        },
        {
          type: 'check_out',
          label: 'Check-out Times',
          addLabel: 'Add Check-out'
        }
      ]}
    />
  )
}