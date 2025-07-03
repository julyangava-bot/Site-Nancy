'use client'

import { Car } from 'lucide-react'
import { ServiceManagerBase } from './service-manager-base'

interface VanManagerProps {
  token: string
  activeTab: string
  onTabChange: (tab: string) => void
}

export function VanManager({ token, activeTab, onTabChange }: VanManagerProps) {
  return (
    <ServiceManagerBase
      token={token}
      service="van"
      serviceLabel="Van Service"
      serviceIcon={<Car className="w-4 h-4 text-pink-500" />}
      activeTab={activeTab}
      onTabChange={onTabChange}
      timeSlotTypes={[
        {
          type: 'time_window',
          label: 'Time Windows',
          addLabel: 'Add Window'
        }
      ]}
    />
  )
}