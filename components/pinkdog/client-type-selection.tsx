"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Phone, Users } from "lucide-react";

interface ClientTypeSelectionProps {
  onNewClient?: () => void;
  onExistingClient: () => void;
  serviceType: 'daycare' | 'van' | 'pethotel';
}

export function ClientTypeSelection({ onExistingClient, serviceType }: ClientTypeSelectionProps) {
  const handleExistingClient = () => {
    // Open Gingr portal in new tab
    window.open("https://pinkdog.portal.gingrapp.com/#/public/login", "_blank");
    // Call the callback which will close the dialog
    onExistingClient();
  };

  const serviceLabel = serviceType === 'pethotel' ? 'pet hotel' : serviceType === 'van' ? 'PinkVan' : 'daycare';

  return (
    <div className="p-6 text-center">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Are you a new or returning client?
        </h3>
        <p className="text-sm text-gray-600">
          New clients can call us directly. Returning clients can log in below.
        </p>
      </div>

      <div className="space-y-3">
        {/* New Client: phone contact for all services */}
        <a
          href="tel:+19787724242"
          className="w-full bg-[#E73992] hover:bg-[#d3337f] text-white font-medium py-4 text-base rounded-xl transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-3"
        >
          <Phone className="w-5 h-5" />
          Call us: (978) 772-4242
        </a>

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
        <div className="text-xs text-gray-600 space-y-1">
          <p>
            <span className="font-medium">New clients:</span> Call us for inquiries about {serviceLabel} availability.
          </p>
          <p>
            <span className="font-medium">Returning clients:</span> Access the portal to manage your {serviceLabel} request.
          </p>
        </div>
      </div>
    </div>
  );
}
