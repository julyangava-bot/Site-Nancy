"use client";

import React from "react";
import { Hotel } from "lucide-react";
import { useModal } from "@/context/providers";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ClientTypeSelection } from "./client-type-selection";

interface PetHotelBookingFormProps {
  children: React.ReactNode;
  variant?: 'default' | 'cta';
  initialOpen?: boolean;
}

export function PetHotelBookingForm({ children, variant = 'default', initialOpen = false }: PetHotelBookingFormProps) {
  const [isOpen, setIsOpen] = React.useState(initialOpen);
  const { setIsAnyModalOpen } = useModal();

  // Update isOpen when initialOpen prop changes
  React.useEffect(() => {
    if (initialOpen) {
      setIsOpen(true);
    }
  }, [initialOpen]);

  // Control modal open state for context
  React.useEffect(() => {
    setIsAnyModalOpen(isOpen);

    return () => {
      setIsAnyModalOpen(false);
    };
  }, [isOpen, setIsAnyModalOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          className={variant === 'cta'
            ? "inline-flex items-center justify-center bg-white text-[#E73992] hover:bg-gray-100 rounded-full px-8 py-4 text-lg font-semibold transition-colors"
            : "bg-[#E73992] text-white hover:bg-[#d3337f] rounded-full px-6 sm:px-8 py-3 text-base sm:text-lg font-medium transition-colors inline-flex items-center justify-center whitespace-nowrap"
          }
          data-testid="pet-hotel-booking-trigger"
        >
          {children}
        </button>
      </DialogTrigger>

      <DialogContent className="flex flex-col overflow-hidden">
        <DialogHeader>
          <div className="p-6 pt-4">
            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <Hotel className="w-8 h-8 text-[#E73992] mr-2" />
                <DialogTitle>Pet Hotel Booking Request</DialogTitle>
              </div>
              <DialogDescription className="px-4">
                We&apos;re excited to welcome your pet! Please choose the right option to continue.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto overscroll-contain">
          <ClientTypeSelection
            serviceType="pethotel"
            onExistingClient={() => {
              setIsOpen(false);
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
