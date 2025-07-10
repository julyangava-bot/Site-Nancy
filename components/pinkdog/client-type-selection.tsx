"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, UserPlus, Users } from "lucide-react";

interface ClientTypeSelectionProps {
  onNewClient: () => void;
  onExistingClient: () => void;
  serviceType: 'daycare' | 'van';
}

export function ClientTypeSelection({ onNewClient, onExistingClient, serviceType }: ClientTypeSelectionProps) {
  const handleExistingClient = () => {
    // Open Gingr portal in new tab
    window.open("https://pinkdog.portal.gingrapp.com/#/public/login", "_blank");
    // Call the callback which will close the dialog
    onExistingClient();
  };

  return (
    <div className="p-6 text-center">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Are you a new or returning client?
        </h3>
        <p className="text-sm text-gray-600">
          {serviceType === 'daycare' 
            ? "New clients will complete a quick evaluation before booking daycare."
            : "Please select below to continue with your PinkVan request"}
        </p>
      </div>

      <div className="space-y-3">
        {/* New Client Button */}
        <Button
          onClick={onNewClient}
          className="w-full bg-[#E73992] hover:bg-[#d3337f] text-white font-medium py-4 text-base rounded-xl transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-3"
        >
          <UserPlus className="w-5 h-5" />
          I&apos;m a New Client
        </Button>

        {/* Existing Client Button */}
        <Button
          onClick={handleExistingClient}
          variant="outline"
          className="w-full border-2 border-[#E73992] text-[#E73992] hover:bg-[#FFF0F7] font-medium py-4 text-base rounded-xl transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-3"
        >
          <Users className="w-5 h-5" />
          I&apos;m a Returning Client
          <ExternalLink className="w-4 h-4" />
        </Button>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-xl">
        <p className="text-xs text-gray-600">
          <span className="font-medium">Returning clients:</span> You&apos;ll be redirected to the client login portal to manage your {serviceType} request.
        </p>
      </div>
    </div>
  );
}