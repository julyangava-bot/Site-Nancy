"use client";

import React, { createContext, useContext, useState } from "react";
import { ServiceSelectionDialog } from "@/components/pinkdog/service-selection-dialog";

interface ServiceDialogContextType {
  openServiceDialog: () => void;
  closeServiceDialog: () => void;
  isServiceDialogOpen: boolean;
}

const ServiceDialogContext = createContext<ServiceDialogContextType | undefined>(undefined);

export function ServiceDialogProvider({ children }: { children: React.ReactNode }) {
  const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false);

  const openServiceDialog = () => setIsServiceDialogOpen(true);
  const closeServiceDialog = () => setIsServiceDialogOpen(false);

  return (
    <ServiceDialogContext.Provider value={{ openServiceDialog, closeServiceDialog, isServiceDialogOpen }}>
      {children}
      <ServiceSelectionDialog 
        isOpen={isServiceDialogOpen} 
        onClose={closeServiceDialog} 
      />
    </ServiceDialogContext.Provider>
  );
}

export function useServiceDialog() {
  const context = useContext(ServiceDialogContext);
  if (context === undefined) {
    throw new Error("useServiceDialog must be used within a ServiceDialogProvider");
  }
  return context;
}