'use client'

import { Dog } from 'lucide-react'
import { ServiceManagerBase } from './service-manager-base'

interface DaycareManagerProps {
  token: string
  activeTab: string
  onTabChange: (tab: string) => void
}

export function DaycareManager({ token, activeTab, onTabChange }: DaycareManagerProps) {
  return (
    <ServiceManagerBase
      token={token}
      service="daycare"
      serviceLabel="Daycare"
      serviceIcon={<Dog className="w-4 h-4 text-pink-500" />}
      activeTab={activeTab}
      onTabChange={onTabChange}
      timeSlotTypes={[
        {
          type: 'drop_off',
          label: 'Drop-off Times',
          addLabel: 'Add Drop-off'
        },
        {
          type: 'pick_up',
          label: 'Pick-up Times',
          addLabel: 'Add Pick-up'
        }
      ]}
    />
  )
}