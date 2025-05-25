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
  imageSrc: string;
  description?: string;
}

// Smooth scroll function
const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

export const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === "/";

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
      name: "Gallery",
      link: "gallery",
      isSection: true,
    },
    {
      name: "Info",
      link: "checkin-info",
      isSection: true,
    },
    {
      name: "About",
      link: "about-us",
      isSection: true,
    },
    {
      name: "FAQ",
      link: "/faq",
      isSection: false,
    },
    {
      name: "Blog",
      link: "/blog",
      isSection: false,
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
      router.push('/');
      // Need a slight delay before scrolling to ensure the page loads
      setTimeout(() => {
        scrollToSection(item.link);
      }, 100);
    }
    // For non-section links like blog, let the normal navigation happen
  }, [isHomePage, router]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full fixed top-4 sm:top-2 inset-x-0 z-50 rounded-full"
    >
      <DesktopNav visible={visible} navItems={navItems} onNavClick={handleNavClick} />
      <MobileNav visible={visible} navItems={navItems} onNavClick={handleNavClick} />
    </motion.div>
  );
};

const DesktopNav = ({ 
  navItems, 
  visible, 
  onNavClick 
}: {
  navItems: NavItem[]; 
  visible: boolean; 
  onNavClick: (e: React.MouseEvent, item: NavItem) => void;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDropdown = (itemName: string) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  return (
    <motion.div
      onMouseLeave={() => {
        setHoveredIndex(null);
        setActiveDropdown(null);
      }}
      animate={{
        width: visible ? "50%" : "80%",
        backgroundColor: visible
          ? "rgba(255,255,255,0.95)"
          : "rgba(255,255,255,0.5)",
        backdropFilter: visible ? "blur(10px)" : "blur(5px)",
        y: visible ? 4 : 0,
        borderRadius: "full",
        boxShadow: visible
          ? "0 10px 30px -10px rgba(0,0,0,0.1)"
          : "0 0 0 transparent",
      }}
      initial={{
        width: "80%",
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
        "hidden lg:flex flex-row self-center items-center justify-between py-3 mx-auto px-8 rounded-full relative z-[100]"
      )}
    >
      <Logo />
      
      {visible ? (
        // Show compact version when scrolled (hamburger + Book Now)
        <div className="flex items-center gap-3">
          <Button
            className="bg-white text-[#E73992] border-2 border-[#E73992] hover:bg-[#FCD1E6] hover:text-[#E73992] hover:border-[#E73992] rounded-full"
            asChild
          >
            <Link href="/login">Book Now</Link>
          </Button>
          
          <motion.div 
            whileHover={{ scale: 1.1 }} 
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="cursor-pointer"
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
                <a
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
                </a>

                {/* Dropdown Menu */}
                {navItem.hasDropdown && activeDropdown === navItem.name && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="absolute top-[calc(100%_+_0.5rem)] left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-lg p-4 z-50 w-[500px]"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      {navItem.dropdownItems?.map((item, i) => (
                        <Link 
                          key={`dropdown-${i}`}
                          href={item.link}
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-pink-50 transition-colors duration-200"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <div className="flex-shrink-0 h-14 w-14 relative">
                            <Image 
                              src={item.imageSrc} 
                              alt={item.name}
                              width={56}
                              height={56}
                              className="rounded-md object-contain"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{item.name}</h3>
                            {item.description && (
                              <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
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
                    asChild
                  >
                    <Link href="/login">Book Now</Link>
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
              height: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              height: "auto",
              y: 0,
            }}
            exit={{
              opacity: 0,
              height: 0,
              y: -10,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
            className="flex rounded-2xl absolute top-20 mt-2 backdrop-blur-xl bg-white/95 inset-x-0 z-50 flex-col items-start justify-start w-full px-6 py-6 shadow-lg"
          >
            {navItems.map((navItem, idx) => (
              <motion.div
                key={`desktop-compact-link-${idx}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: {
                    delay: idx * 0.05,
                  },
                }}
                className="w-full border-b border-gray-100 last:border-0 py-3"
              >
                {navItem.hasDropdown ? (
                  <div className="w-full">
                    <button
                      onClick={() => toggleDropdown(navItem.name)}
                      className="flex w-full justify-between items-center text-black/90 hover:text-black"
                    >
                      <span>{navItem.name}</span>
                      <IconChevronDown 
                        className={`h-4 w-4 transition-transform ${
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
                          className="pl-4 mt-2 flex flex-col space-y-2"
                        >
                          {navItem.dropdownItems?.map((item, i) => (
                            <Link
                              key={`desktop-compact-dropdown-${i}`}
                              href={item.link}
                              className="text-gray-700 hover:text-[#E73992] py-1"
                              onClick={() => {
                                setActiveDropdown(null);
                                setMobileMenuOpen(false);
                              }}
                            >
                              {item.name}
                            </Link>
                          ))}
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
                    className="relative text-black/90 hover:text-black transition-colors"
                  >
                    <motion.span className="block">
                      {navItem.name}
                    </motion.span>
                  </a>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const MobileNav = ({ 
  navItems, 
  visible, 
  onNavClick 
}: {
  navItems: NavItem[]; 
  visible: boolean; 
  onNavClick: (e: React.MouseEvent, item: NavItem) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  
  const handleMobileNavClick = (e: React.MouseEvent, navItem: NavItem) => {
    if (!navItem.hasDropdown) {
      onNavClick(e, navItem);
      setOpen(false);
    }
  };

  const toggleDropdown = (itemName: string) => {
    setExpandedItem(expandedItem === itemName ? null : itemName);
  };

  return (
    <>
      <motion.div
        animate={{
          backdropFilter: "blur(16px)",
          background: visible
            ? "rgba(255, 255, 255, 0.95)"
            : "rgba(255, 255, 255, 0.8)",
          width: visible ? "85%" : "90%",
          y: visible ? 4 : 0,
          borderRadius: "full",
          padding: "12px 20px",
          boxShadow: visible
            ? "0 10px 30px -10px rgba(0,0,0,0.1)"
            : "0 0 0 transparent",
        }}
        initial={{
          width: "85%",
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
          "flex relative flex-col lg:hidden w-full justify-between items-center max-w-[calc(100vw-2rem)] mx-auto z-50 rounded-full"
        )}
      >
        <div className="flex flex-row justify-between items-center w-full">
          <Logo />
          <div className="flex items-center gap-3">
            {/* Book Now button - visible until sm breakpoint */}
            <div className="hidden sm:block">
              <Button
                className="bg-white text-[#E73992] border-2 border-[#E73992] hover:bg-[#FCD1E6] hover:text-[#E73992] hover:border-[#E73992] rounded-full"
                asChild
              >
                <Link href="/login">Book Now</Link>
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
                height: 0,
                y: -10,
              }}
              animate={{
                opacity: 1,
                height: "auto",
                y: 0,
              }}
              exit={{
                opacity: 0,
                height: 0,
                y: -10,
              }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
              }}
              className="flex rounded-2xl absolute top-20 mt-2 backdrop-blur-xl bg-white/95 inset-x-0 z-50 flex-col items-start justify-start w-full px-6 py-6 shadow-lg"
            >
              {navItems.map((navItem, idx) => (
                <motion.div
                  key={`link=${idx}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: {
                      delay: idx * 0.05,
                    },
                  }}
                  className="w-full border-b border-gray-100 last:border-0 py-3"
                >
                  {navItem.hasDropdown ? (
                    <div className="w-full">
                      <button
                        onClick={() => toggleDropdown(navItem.name)}
                        className="flex w-full justify-between items-center text-black/90 hover:text-black"
                      >
                        <span>{navItem.name}</span>
                        <IconChevronDown 
                          className={`h-4 w-4 transition-transform ${
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
                            className="pl-4 mt-2 flex flex-col space-y-2"
                          >
                            {navItem.dropdownItems?.map((item, i) => (
                              <Link
                                key={`mobile-dropdown-${i}`}
                                href={item.link}
                                className="text-gray-700 hover:text-[#E73992] py-1"
                                onClick={() => {
                                  setExpandedItem(null);
                                  setOpen(false);
                                }}
                              >
                                {item.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <a
                      href={navItem.isSection ? `#${navItem.link}` : navItem.link}
                      onClick={(e) => handleMobileNavClick(e, navItem)}
                      className="relative text-black/90 hover:text-black transition-colors"
                    >
                      <motion.span className="block">
                        {navItem.name}
                      </motion.span>
                    </a>
                  )}
                </motion.div>
              ))}

              {/* Book Now button - only visible in mobile menu when not in top bar */}
              <div className="flex flex-col w-full gap-3 mt-4 sm:hidden">
                <Button
                  className="bg-white text-[#E73992] border-2 border-[#E73992] hover:bg-[#FCD1E6] hover:text-[#E73992] hover:border-[#E73992] rounded-full w-full"
                  asChild
                >
                  <Link href="/login" onClick={() => setOpen(false)}>Book Now</Link>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};
