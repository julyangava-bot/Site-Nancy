"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { scrollToSection } from "@/lib/navigation";

export function ScrollToHash() {
  const pathname = usePathname();

  useEffect(() => {
    // Check if there's a hash in the URL
    const hash = window.location.hash;
    
    if (hash && pathname === '/') {
      // Remove the # and get the section ID
      const sectionId = hash.substring(1);
      
      // Wait a bit for the page to fully render
      const scrollTimeout = setTimeout(() => {
        scrollToSection(sectionId);
      }, 200);

      return () => clearTimeout(scrollTimeout);
    }
  }, [pathname]);

  // Also listen for hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash && pathname === '/') {
        const sectionId = hash.substring(1);
        scrollToSection(sectionId);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [pathname]);

  return null;
} 