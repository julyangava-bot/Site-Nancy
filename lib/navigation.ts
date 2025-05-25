// Shared navigation utilities for consistent section navigation
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

// Smooth scroll function
export const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

// Wait for element to exist then scroll
const waitForElementAndScroll = (sectionId: string, maxAttempts = 50) => {
  let attempts = 0;
  
  const checkAndScroll = () => {
    const element = document.getElementById(sectionId);
    
    if (element) {
      // Element found, scroll to it
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100); // Small delay to ensure layout is complete
    } else if (attempts < maxAttempts) {
      // Element not found yet, try again
      attempts++;
      setTimeout(checkAndScroll, 100);
    }
  };
  
  checkAndScroll();
};

// Navigation handler for section links
export const handleSectionNavigation = (
  href: string,
  isHomePage: boolean,
  router: AppRouterInstance
) => {
  // Check if it's a section link (starts with #)
  if (href.startsWith('#')) {
    const sectionId = href.substring(1); // Remove the #
    
    if (isHomePage) {
      // If on home page, just scroll to section
      scrollToSection(sectionId);
    } else {
      // If not on home page, navigate to home with the hash
      router.push(`/${href}`);
      // Wait for the page to load and the element to exist
      waitForElementAndScroll(sectionId);
    }
    return true; // Indicates this was handled as a section link
  }
  
  return false; // Not a section link, let normal navigation happen
};

// Check if a link is a section link
export const isSectionLink = (href: string): boolean => {
  return href.startsWith('#');
}; 