"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX, IconChevronDown } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { handleSectionNavigation, scrollToSection } from "@/lib/navigation";
import { Users, Heart, HelpCircle } from "lucide-react";
import { IconBrandInstagram, IconBrandFacebook } from "@tabler/icons-react";
import { useModal } from "@/context/providers";
import { ServiceSelectionDialog } from "@/components/pinkdog/service-selection-dialog";

interface NavItem {
  name: string;
  link: string;
  isSection?: boolean;
  hasDropdown?: boolean;
  dropdownItems?: DropdownItem[];
}

interface DropdownItem {
  name: string;
  link: string;
  imageSrc?: string;
  icon?: React.ReactNode;
  description?: string;
}

export const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const { isAnyModalOpen } = useModal();
  const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false);

  const navItems: NavItem[] = [
    {
      name: "Home",
      link: "/",
      isSection: false,
    },
    {
      name: "Services",
      link: "services",
      isSection: true,
      hasDropdown: true,
      dropdownItems: [
        {
          name: "Pet Hotel",
          link: "/pet-hotel",
          imageSrc: "/images/icons/pethotel-icon.png",
          description: "Comfortable boarding for your pet"
        },
        {
          name: "Daycare",
          link: "/daycare",
          imageSrc: "/images/icons/daycare-icon.png",
          description: "Supervised playtime and socialization"
        },
        {
          name: "Grooming",
          link: "/grooming",
          imageSrc: "/images/icons/grooming-icon.png",
          description: "Professional pet styling and care"
        },
        {
          name: "Van Service",
          link: "/van-service",
          imageSrc: "/images/icons/van-icon.png",
          description: "Convenient pet transportation"
        }
      ]
    },
    {
      name: "About",
      link: "#",
      isSection: false,
      hasDropdown: true,
      dropdownItems: [
        {
          name: "About Us",
          link: "/about",
          icon: <Users className="w-10 h-10" />,
          description: "Our story and mission"
        },
        {
          name: "Our Philosophy",
          link: "/philosophy",
          icon: <Heart className="w-10 h-10" />,
          description: "Our values and approach"
        },
        {
          name: "Gallery",
          link: "/#gallery",
          icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>,
          description: "Photos and videos"
        }
      ]
    },
    {
      name: "FAQ",
      link: "/faq",
      isSection: false,
    },
    {
      name: "Contact",
      link: "checkin-info",
      isSection: true,
    },
  ];

  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  const handleNavClick = useCallback((e: React.MouseEvent, item: NavItem) => {
    if (item.isSection && isHomePage) {
      e.preventDefault();
      scrollToSection(item.link);
    } else if (!isHomePage && item.isSection) {
      // If not on home page but clicking a section link, first navigate to home
      e.preventDefault();
      handleSectionNavigation(`#${item.link}`, isHomePage, router);
    }
    // For non-section links like blog, let the normal navigation happen
  }, [isHomePage, router]);

  // Hide navbar when any modal is open
  if (isAnyModalOpen) {
    return null;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full fixed top-4 sm:top-2 inset-x-0 z-50"
    >
      <DesktopNav 
        visible={visible} 
        navItems={navItems} 
        onNavClick={handleNavClick} 
        setIsServiceDialogOpen={setIsServiceDialogOpen}
      />
      <MobileNav 
        visible={visible} 
        navItems={navItems} 
        onNavClick={handleNavClick} 
        setIsServiceDialogOpen={setIsServiceDialogOpen}
      />
      
      {/* Custom scrollbar styles for mobile menu */}
      <style jsx global>{`
        .mobile-menu-scroll::-webkit-scrollbar {
          width: 4px;
        }
        
        .mobile-menu-scroll::-webkit-scrollbar-track {
          background: rgba(231, 57, 146, 0.1);
          border-radius: 10px;
        }
        
        .mobile-menu-scroll::-webkit-scrollbar-thumb {
          background: rgba(231, 57, 146, 0.3);
          border-radius: 10px;
        }
        
        .mobile-menu-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(231, 57, 146, 0.5);
        }
        
        /* For Firefox */
        .mobile-menu-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(231, 57, 146, 0.3) rgba(231, 57, 146, 0.1);
          -webkit-overflow-scrolling: touch;
          scroll-behavior: smooth;
        }
      `}</style>
      
      <ServiceSelectionDialog 
        isOpen={isServiceDialogOpen} 
        onClose={() => setIsServiceDialogOpen(false)} 
      />
    </motion.div>
  );
};

const DesktopNav = ({ 
  navItems, 
  visible, 
  onNavClick,
  setIsServiceDialogOpen
}: {
  navItems: NavItem[]; 
  visible: boolean; 
  onNavClick: (e: React.MouseEvent, item: NavItem) => void;
  setIsServiceDialogOpen: (open: boolean) => void;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Block body scroll when desktop compact menu is open using Tailwind classes
  React.useEffect(() => {
    if (mobileMenuOpen && visible) {
      document.documentElement.classList.add('overflow-hidden');
      document.body.classList.add('overflow-hidden');
    } else {
      document.documentElement.classList.remove('overflow-hidden');
      document.body.classList.remove('overflow-hidden');
    }
    
    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.documentElement.classList.remove('overflow-hidden');
      document.body.classList.remove('overflow-hidden');
    };
  }, [mobileMenuOpen, visible]);
  
  // Close compact menu when clicking outside or pressing escape
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      // Check if the click is outside both the nav container and the hamburger button
      if (mobileMenuOpen && !target.closest('.desktop-nav-container') && !target.closest('.hamburger-button')) {
        setMobileMenuOpen(false);
        setActiveDropdown(null);
      }
    };
    
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
        setActiveDropdown(null);
      }
    };
    
    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [mobileMenuOpen]);

  const toggleDropdown = (itemName: string) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  // Icons for menu items
  const getItemIcon = (itemName: string) => {
    switch(itemName) {
      case "Home":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      case "Services":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        );
      case "About":
        return <Users className="w-5 h-5" />;
      case "FAQ":
        return <HelpCircle className="w-5 h-5" />;
      case "Contact":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="hidden lg:block w-full">
      <div className={cn(
        "mx-auto transition-all duration-300",
        visible ? "max-w-3xl" : "max-w-7xl"
      )}>
        <motion.div
          animate={{
            backgroundColor: visible
              ? "rgba(255,255,255,0.95)"
              : "rgba(255,255,255,1.0)",
            backdropFilter: visible ? "blur(10px)" : "blur(5px)",
            y: visible ? 4 : 0,
            boxShadow: visible
              ? "0 10px 30px -10px rgba(0,0,0,0.1)"
              : "0 0 0 transparent",
          }}
          initial={{
            scale: 0.95,
            opacity: 0,
          }}
          whileInView={{
            scale: 1,
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className="rounded-full"
        >
          <div 
            className="px-4 sm:px-6 lg:px-8"
            onMouseLeave={() => {
              setHoveredIndex(null);
              setActiveDropdown(null);
            }}
          >
            <div className="flex items-center justify-between py-3 relative z-[100]">
              <Logo />
              
              {visible ? (
                // Show compact version when scrolled (hamburger + Book Now)
                <div className="flex items-center gap-3">
                  <Button
                    className="bg-white text-[#E73992] border-2 border-[#E73992] hover:bg-[#FCD1E6] hover:text-[#E73992] hover:border-[#E73992] rounded-full"
                    onClick={() => setIsServiceDialogOpen(true)}
                  >
                    Book Now
                  </Button>
                  
                  <motion.div 
                    whileHover={{ scale: 1.1 }} 
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="cursor-pointer hamburger-button"
                  >
                    {mobileMenuOpen ? (
                      <IconX className="text-black/90" />
                    ) : (
                      <IconMenu2 className="text-black/90" />
                    )}
                  </motion.div>
                </div>
              ) : (
                // Show full navigation when not scrolled
                <>
                  <motion.div
                    className="lg:flex flex-row flex-1 items-center justify-center space-x-2 text-sm"
                    animate={{
                      scale: 1,
                      justifyContent: visible ? "flex-end" : "center",
                    }}
                  >
                    {navItems.map((navItem, idx) => (
                      <motion.div
                        key={`nav-item-${idx}`}
                        onHoverStart={() => {
                          setHoveredIndex(idx);
                          if (navItem.hasDropdown) {
                            setActiveDropdown(navItem.name);
                          } else {
                            setActiveDropdown(null);
                          }
                        }}
                        className="relative"
                      >
                        <Link
                          className="text-black/90 relative px-3 py-1.5 transition-colors cursor-pointer flex items-center"
                          href={navItem.isSection ? `#${navItem.link}` : navItem.link}
                          onClick={(e) => {
                            if (!navItem.hasDropdown) {
                              onNavClick(e, navItem);
                            } else if (navItem.isSection) {
                              e.preventDefault();
                              scrollToSection(navItem.link);
                            }
                          }}
                        >
                          <span className="relative z-10">{navItem.name}</span>
                          {navItem.hasDropdown && (
                            <IconChevronDown className="h-4 w-4 ml-1 text-black/70" />
                          )}
                          {hoveredIndex === idx && (
                            <motion.div
                              layoutId="menu-hover"
                              className="absolute inset-0 rounded-full"
                              initial={{ opacity: 0 }}
                              animate={{
                                opacity: 1,
                                background:
                                  "linear-gradient(145deg, rgba(252,209,230,0.6) 0%, rgba(231,57,146,0.2) 100%)",
                                boxShadow: "0 4px 15px rgba(231,57,146,0.1)",
                              }}
                              exit={{
                                opacity: 0,
                              }}
                              transition={{
                                duration: 0.05,
                              }}
                            />
                          )}
                        </Link>

                        {/* Dropdown Menu */}
                        {navItem.hasDropdown && activeDropdown === navItem.name && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="absolute top-[calc(100%_+_0.5rem)] left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-xl border border-gray-100 p-5 z-50 w-[520px]"
                          >
                            <div className="grid grid-cols-2 gap-3">
                              {navItem.dropdownItems?.map((item, i) => (
                                <Link 
                                  key={`dropdown-${i}`}
                                  href={item.link}
                                  className="group flex items-start gap-3 p-4 rounded-xl hover:bg-gradient-to-r hover:from-pink-50 hover:to-pink-50/50 transition-all duration-200 hover:shadow-sm"
                                  onClick={() => setActiveDropdown(null)}
                                >
                                  <div className="flex-shrink-0 h-14 w-14 relative flex items-center justify-center">
                                    {item.imageSrc ? (
                                      <Image 
                                        src={item.imageSrc} 
                                        alt={item.name}
                                        width={56}
                                        height={56}
                                        className="rounded-md object-contain"
                                      />
                                    ) : item.icon ? (
                                      <div className="text-[#E73992] w-full h-full flex items-center justify-center bg-pink-50 rounded-xl group-hover:bg-white transition-colors duration-200">
                                        {item.icon}
                                      </div>
                                    ) : null}
                                  </div>
                                  <div className="flex flex-col justify-center">
                                    <h3 className="font-semibold text-gray-900 group-hover:text-[#E73992] transition-colors duration-200">{item.name}</h3>
                                    {item.description && (
                                      <p className="text-xs text-gray-600 mt-0.5 group-hover:text-gray-700 transition-colors duration-200">{item.description}</p>
                                    )}
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </motion.div>

                  <AnimatePresence mode="popLayout" initial={false}>
                    {!visible && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          transition: {
                            duration: 0.2,
                          },
                        }}
                        exit={{
                          opacity: 0,
                          x: 20,
                          transition: {
                            duration: 0.2,
                          },
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <Button
                            className="bg-white text-[#E73992] border-2 border-[#E73992] hover:bg-[#FCD1E6] hover:text-[#E73992] hover:border-[#E73992] rounded-full"
                            onClick={() => setIsServiceDialogOpen(true)}
                          >
                            Book Now
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}

              {/* Compact menu dropdown */}
              <AnimatePresence>
                {visible && mobileMenuOpen && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -10,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut",
                    }}
                    className="desktop-nav-container flex rounded-3xl absolute top-[calc(100%+8px)] backdrop-blur-xl bg-white/98 left-0 right-0 z-50 flex-col items-center justify-start w-full px-4 py-6 shadow-2xl max-h-[calc(100vh-8rem)] overflow-y-auto mobile-menu-scroll"
                  >
                    {navItems.map((navItem, idx) => (
                      <motion.div
                        key={`desktop-compact-link-${idx}`}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          transition: {
                            delay: idx * 0.05,
                          },
                        }}
                        className="w-full"
                      >
                        {navItem.hasDropdown ? (
                          <div className="w-full py-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleDropdown(navItem.name);
                              }}
                              className="flex w-full items-center justify-between text-black/90 hover:text-[#E73992] transition-colors px-4 py-3 rounded-xl hover:bg-[#FFF0F7]"
                            >
                              <div className="flex items-center gap-4">
                                <div className="text-[#E73992]">
                                  {getItemIcon(navItem.name)}
                                </div>
                                <span className="font-medium text-lg">{navItem.name}</span>
                              </div>
                              <IconChevronDown 
                                className={`h-5 w-5 transition-transform text-[#E73992] ${
                                  activeDropdown === navItem.name ? "rotate-180" : ""
                                }`} 
                              />
                            </button>
                            
                            <AnimatePresence>
                              {activeDropdown === navItem.name && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <div className="pl-12 pr-4 pb-2 space-y-1">
                                    {navItem.dropdownItems?.map((item, i) => (
                                      <Link
                                        key={`desktop-compact-dropdown-${i}`}
                                        href={item.link}
                                        className="block py-3 px-4 text-gray-700 hover:text-[#E73992] hover:bg-[#FFEBF5] rounded-lg transition-all duration-200 font-medium"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setActiveDropdown(null);
                                          setMobileMenuOpen(false);
                                        }}
                                      >
                                        <div className="flex items-center gap-4">
                                          <div className="text-[#E73992]/70 flex-shrink-0 h-8 w-8 relative flex items-center justify-center">
                                            {item.imageSrc ? (
                                              <Image 
                                                src={item.imageSrc} 
                                                alt={item.name}
                                                width={32}
                                                height={32}
                                                className="rounded-md object-contain"
                                              />
                                            ) : item.icon ? (
                                              <div className="w-5 h-5 flex items-center justify-center text-[#E73992]">
                                                {item.icon}
                                              </div>
                                            ) : (
                                              <div className="w-5 h-5 rounded-full bg-[#E73992]/20"></div>
                                            )}
                                          </div>
                                          <div>
                                            <p className="text-base">{item.name}</p>
                                            {item.description && (
                                              <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                                            )}
                                          </div>
                                        </div>
                                      </Link>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <a
                            href={navItem.isSection ? `#${navItem.link}` : navItem.link}
                            onClick={(e) => {
                              onNavClick(e, navItem);
                              setMobileMenuOpen(false);
                            }}
                            className="flex items-center gap-4 text-black/90 hover:text-[#E73992] transition-colors w-full px-4 py-3 my-3 rounded-xl hover:bg-[#FFF0F7]"
                          >
                            <div className="text-[#E73992]">
                              {getItemIcon(navItem.name)}
                            </div>
                            <span className="font-medium text-lg">{navItem.name}</span>
                          </a>
                        )}
                      </motion.div>
                    ))}

                    {/* Social Media Icons - Modern 2 column layout */}
                    <div className="mt-8 pt-6 border-t border-gray-100 w-full">
                      <div className="flex justify-center gap-6 px-4">
                        <Link 
                          href="https://instagram.com/pinkdogspa" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="group relative"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-[#E73992] to-[#FF6B9D] rounded-2xl blur-xl opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
                          <div className="relative bg-white hover:bg-[#FFF0F7] p-4 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-pink-100">
                            <IconBrandInstagram size={28} className="text-[#E73992]" />
                          </div>
                        </Link>
                        
                        <Link 
                          href="https://facebook.com/pinkdogspa" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="group relative"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-[#E73992] to-[#FF6B9D] rounded-2xl blur-xl opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
                          <div className="relative bg-white hover:bg-[#FFF0F7] p-4 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-pink-100">
                            <IconBrandFacebook size={28} className="text-[#E73992]" />
                          </div>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const MobileNav = ({ 
  navItems, 
  visible, 
  onNavClick,
  setIsServiceDialogOpen
}: {
  navItems: NavItem[]; 
  visible: boolean; 
  onNavClick: (e: React.MouseEvent, item: NavItem) => void;
  setIsServiceDialogOpen: (open: boolean) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  
  // Block body scroll when mobile menu is open using Tailwind classes
  React.useEffect(() => {
    if (open) {
      document.documentElement.classList.add('overflow-hidden');
      document.body.classList.add('overflow-hidden', 'fixed', 'w-full');
    } else {
      document.documentElement.classList.remove('overflow-hidden');
      document.body.classList.remove('overflow-hidden', 'fixed', 'w-full');
    }
    
    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.documentElement.classList.remove('overflow-hidden');
      document.body.classList.remove('overflow-hidden', 'fixed', 'w-full');
    };
  }, [open]);
  
  // Close menu when clicking outside or pressing escape
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (open && !target.closest('.mobile-nav-container')) {
        setOpen(false);
        setExpandedItem(null);
      }
    };
    
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        setOpen(false);
        setExpandedItem(null);
      }
    };
    
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [open]);
  
  const handleMobileNavClick = (e: React.MouseEvent, navItem: NavItem) => {
    if (!navItem.hasDropdown) {
      onNavClick(e, navItem);
      setOpen(false);
    }
  };

  const toggleDropdown = (itemName: string) => {
    setExpandedItem(expandedItem === itemName ? null : itemName);
  };

  // Icons for mobile menu items
  const getItemIcon = (itemName: string) => {
    switch(itemName) {
      case "Home":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      case "Services":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        );
      case "About":
        return <Users className="w-5 h-5" />;
      case "FAQ":
        return <HelpCircle className="w-5 h-5" />;
      case "Contact":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="lg:hidden w-full">
        <div className={cn(
          "mx-auto transition-all duration-300",
          visible ? "max-w-lg" : "max-w-7xl"
        )}>
          <motion.div
            animate={{
              backdropFilter: "blur(16px)",
              background: visible
                ? "rgba(255, 255, 255, 0.95)"
                : "rgba(255, 255, 255, 1.0)",
              y: visible ? 4 : 0,
              borderRadius: "50px",
              boxShadow: visible
                ? "0 10px 30px -10px rgba(0,0,0,0.1)"
                : "0 0 0 transparent",
            }}
            initial={{
              scale: 0.95,
              opacity: 0,
            }}
            whileInView={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className={cn(
              "flex relative flex-col justify-between items-center z-50 rounded-full mobile-nav-container"
            )}
          >
            <div className="flex flex-row justify-between items-center w-full px-4 sm:px-6 lg:px-8 py-3">
              <Logo />
              <div className="flex items-center gap-3">
                {/* Book Now button - visible until sm breakpoint */}
                <div className="hidden sm:block">
                  <Button
                    className="bg-white text-[#E73992] border-2 border-[#E73992] hover:bg-[#FCD1E6] hover:text-[#E73992] hover:border-[#E73992] rounded-full"
                    onClick={() => setIsServiceDialogOpen(true)}
                  >
                    Book Now
                  </Button>
                </div>
                
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  {open ? (
                    <IconX className="text-black/90" onClick={() => setOpen(!open)} />
                  ) : (
                    <IconMenu2
                      className="text-black/90"
                      onClick={() => setOpen(!open)}
                    />
                  )}
                </motion.div>
              </div>
            </div>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -10,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                  }}
                  className={cn(
                    "flex rounded-3xl absolute top-[calc(100%+8px)] backdrop-blur-xl bg-white/98 z-50 flex-col items-center justify-start px-4 py-6 shadow-2xl mobile-menu-scroll",
                    "left-0 right-0 max-h-[calc(100vh-8rem)] overflow-y-auto"
                  )}
                >
                  {navItems.map((navItem, idx) => (
                    <motion.div
                      key={`link=${idx}`}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: {
                          delay: idx * 0.05,
                        },
                      }}
                      className="w-full"
                    >
                      {navItem.hasDropdown ? (
                        <div className="w-full py-3">
                          <button
                            onClick={() => toggleDropdown(navItem.name)}
                            className="flex w-full items-center justify-between text-black/90 hover:text-[#E73992] transition-colors px-4 py-3 rounded-xl hover:bg-[#FFF0F7]"
                          >
                            <div className="flex items-center gap-4">
                              <div className="text-[#E73992]">
                                {getItemIcon(navItem.name)}
                              </div>
                              <span className="font-medium text-lg mobile-nav-item">{navItem.name}</span>
                            </div>
                            <IconChevronDown 
                              className={`h-5 w-5 transition-transform text-[#E73992] ${
                                expandedItem === navItem.name ? "rotate-180" : ""
                              }`} 
                            />
                          </button>
                          
                          <AnimatePresence>
                            {expandedItem === navItem.name && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="pl-12 pr-4 pb-2 space-y-1">
                                  {navItem.dropdownItems?.map((item, i) => (
                                    <Link
                                      key={`mobile-dropdown-${i}`}
                                      href={item.link}
                                      className="block py-3 px-4 text-gray-700 hover:text-[#E73992] hover:bg-[#FFEBF5] rounded-lg transition-all duration-200 font-medium"
                                      onClick={() => {
                                        setExpandedItem(null);
                                        setOpen(false);
                                      }}
                                    >
                                      <div className="flex items-center gap-4">
                                        <div className="text-[#E73992]/70 flex-shrink-0 h-8 w-8 relative flex items-center justify-center">
                                          {item.imageSrc ? (
                                            <Image 
                                              src={item.imageSrc} 
                                              alt={item.name}
                                              width={32}
                                              height={32}
                                              className="rounded-md object-contain"
                                            />
                                          ) : item.icon ? (
                                            <div className="w-5 h-5 flex items-center justify-center text-[#E73992]">
                                              {item.icon}
                                            </div>
                                          ) : (
                                            <div className="w-5 h-5 rounded-full bg-[#E73992]/20"></div>
                                          )}
                                        </div>
                                        <div>
                                          <p className="text-base mobile-nav-item">{item.name}</p>
                                          {item.description && (
                                            <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                                          )}
                                        </div>
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <a
                          href={navItem.isSection ? `#${navItem.link}` : navItem.link}
                          onClick={(e) => handleMobileNavClick(e, navItem)}
                          className="flex items-center gap-4 text-black/90 hover:text-[#E73992] transition-colors w-full px-4 py-3 my-3 rounded-xl hover:bg-[#FFF0F7]"
                        >
                          <div className="text-[#E73992]">
                            {getItemIcon(navItem.name)}
                          </div>
                          <span className="font-medium text-lg mobile-nav-item">{navItem.name}</span>
                        </a>
                      )}
                    </motion.div>
                  ))}

                  {/* Book Now button - only visible in mobile menu when not in top bar */}
                  <div className="flex flex-col w-full gap-3 mt-6 px-4 sm:hidden">
                    <Button
                      className="bg-[#E73992] text-white hover:bg-[#d3337f] rounded-full w-full py-6 text-lg font-semibold shadow-lg"
                      onClick={() => {
                        setOpen(false);
                        setIsServiceDialogOpen(true);
                      }}
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Book Now
                    </Button>
                  </div>

                  {/* Social Media Links */}
                  <div className="mt-8 pt-6 border-t border-gray-100 w-full">
                    <div className="flex justify-center gap-6 px-4">
                      <Link 
                        href="https://instagram.com/pinkdogspa" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group relative"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-[#E73992] to-[#FF6B9D] rounded-2xl blur-xl opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
                        <div className="relative bg-white hover:bg-[#FFF0F7] p-4 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-pink-100">
                          <IconBrandInstagram size={28} className="text-[#E73992]" />
                        </div>
                      </Link>
                      
                      <Link 
                        href="https://facebook.com/pinkdogspa" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group relative"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-[#E73992] to-[#FF6B9D] rounded-2xl blur-xl opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
                        <div className="relative bg-white hover:bg-[#FFF0F7] p-4 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-pink-100">
                          <IconBrandFacebook size={28} className="text-[#E73992]" />
                        </div>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </>
  );
};
