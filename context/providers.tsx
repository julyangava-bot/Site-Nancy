"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps,
} from "next-themes";

// Context for managing modal/form states
interface ModalContextType {
  isAnyModalOpen: boolean;
  setIsAnyModalOpen: (isOpen: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}

function ModalProvider({ children }: { children: ReactNode }) {
  const [isAnyModalOpen, setIsAnyModalOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ isAnyModalOpen, setIsAnyModalOpen }}>
      {children}
    </ModalContext.Provider>
  );
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ModalProvider>
      <NextThemesProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </NextThemesProvider>
    </ModalProvider>
  );
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
