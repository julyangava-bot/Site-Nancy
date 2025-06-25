"use client";

import Link from "next/link";
import { Logo } from "./logo";
import { IconBrandInstagram, IconBrandFacebook, IconMapPin, IconClock, IconPhone, IconBrandWhatsapp } from "@tabler/icons-react";
import { motion } from "motion/react";
import { useRouter, usePathname } from "next/navigation";
import { handleSectionNavigation, isSectionLink } from "@/lib/navigation";
import { useServiceDialog } from "@/context/service-dialog-context";

export function Footer() {
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const { openServiceDialog } = useServiceDialog();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (isSectionLink(href)) {
      e.preventDefault();
      handleSectionNavigation(href, isHomePage, router);
    }
    // For external links and non-section internal links, let the normal Link navigation happen
  };

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Philosophy", href: "/philosophy" },
    { name: "Gallery", href: "#gallery" },
    // { name: "Blog", href: "/blog" },
  ];

  const servicesLinks = [
    { name: "Pet Hotel", href: "/pet-hotel" },
    { name: "Daycare", href: "/daycare" },
    { name: "Grooming", href: "/grooming" },
    { name: "Van Service", href: "/van-service" },
  ];

  const supportLinks = [
    { name: "FAQ", href: "/faq" },
    { name: "Contact Us", href: "#checkin-info" },
    { name: "Book Now", href: "#book-now", isDialog: true },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Data Deletion", href: "/data-deletion" },
  ];

  const locations = [
    {
      name: "Harvard - Pet Resort",
      address: "259 Ayer Rd, Harvard, MA 01451",
      hours: {
        weekdays: "Mon-Sat: 8:30 AM - 5:00 PM",
        sunday: "Sunday: 12:00 PM - 4:00 PM"
      },
      phone: "978-772-4242",
      features: ["24/7 Pet Resort", "Pet Hotel", "Daycare", "Grooming"],
      isPrimary: true,
      mapUrl: "https://maps.google.com/?q=259+Ayer+Rd+Harvard+MA+01451"
    },
    {
      name: "Sudbury Spa",
      address: "621 Boston Post Rd, Sudbury, MA 01776",
      hours: {
        weekdays: "Mon-Sat: 9:00 AM - 5:30 PM",
        sunday: "Sunday: Closed"
      },
      features: ["Grooming", "Spa Services"],
      mapUrl: "https://maps.google.com/?q=621+Boston+Post+Rd+Sudbury+MA+01776",
      hasExternalSite: true
    },
    {
      name: "Boxborough Spa",
      address: "650 Massachusetts Ave, Boxborough, MA 01719",
      hours: {
        weekdays: "Mon-Sat: 9:00 AM - 5:30 PM",
        sunday: "Sunday: Closed"
      },
      features: ["Grooming", "Spa Services"],
      mapUrl: "https://maps.google.com/?q=650+Massachusetts+Ave+Boxborough+MA+01719",
      hasExternalSite: true
    },
    {
      name: "Coconut Creek, FL",
      address: "4407 West Boulevard, Coconut Creek, FL 33073",
      hours: {
        weekdays: "Mon-Sat: 8:30 AM - 5:00 PM",
        sunday: "Sunday: Closed"
      },
      features: ["Grooming", "Spa Services", "Daycare"],
      mapUrl: "https://maps.google.com/?q=4407+West+Boulevard+Coconut+Creek+FL+33073",
      hasExternalSite: true
    }
  ];

  return (
    <footer className="w-full bg-gradient-to-b from-[#FFF9FC] to-white border-t border-gray-100 pb-10 sm:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-8 lg:gap-4 mb-12">
          {/* Company Info - Spans 2 columns on mobile and large screens */}
          <div className="col-span-2 lg:col-span-2 text-center md:text-left">
            <div className="mb-6 flex justify-center md:justify-start" >
              <Logo />
            </div>
            <p className="text-gray-600 text-sm mb-6 max-w-xs mx-auto md:mx-0">
              Premier pet care services for your furry friends. Where every pet is treated like family.
            </p>
            
            {/* Social Media */}
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <Link
                href="https://instagram.com/pinkdogspa"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-full p-2 text-gray-600 hover:text-white hover:bg-[#E73992] transition-all duration-300 shadow-md hover:shadow-lg"
                aria-label="Instagram"
              >
                <IconBrandInstagram size={20} />
              </Link>
              <Link
                href="https://facebook.com/pinkdogspa"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-full p-2 text-gray-600 hover:text-white hover:bg-[#3b5998] transition-all duration-300 shadow-md hover:shadow-lg"
                aria-label="Facebook"
              >
                <IconBrandFacebook size={20} />
              </Link>
              <Link
                href="https://wa.me/19549140128"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-full p-2 text-gray-600 hover:text-white hover:bg-[#25d366] transition-all duration-300 shadow-md hover:shadow-lg"
                aria-label="WhatsApp"
              >
                <IconBrandWhatsapp size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className="text-gray-600 hover:text-[#E73992] transition-colors text-sm block py-1"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wider">Services</h3>
            <ul className="space-y-2">
              {servicesLinks.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className="text-gray-600 hover:text-[#E73992] transition-colors text-sm block py-1"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="col-span-2 md:col-span-1 text-center md:text-left">
            <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wider">Support</h3>
            <ul className="space-y-2">
              {supportLinks.map((item, idx) => (
                <li key={idx}>
                  {item.isDialog ? (
                    <button
                      onClick={() => openServiceDialog()}
                      className="text-gray-600 hover:text-[#E73992] transition-colors text-sm block py-1 text-center w-full"
                    >
                      {item.name}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={(e) => handleLinkClick(e, item.href)}
                      className="text-gray-600 hover:text-[#E73992] transition-colors text-sm block py-1"
                      {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* All Locations Section */}
        <div className="mb-12">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 text-center mb-2">
              Our <span className="text-[#E73992]">Locations</span>
            </h3>
            
            {/* Info about external site for specific locations */}
            <p className="text-center text-sm text-gray-600">
              Visit us on{" "}
              <Link 
                href="https://pinkdogspa.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#E73992] hover:text-[#d3337f] underline font-medium"
              >
                PinkDog Spa
              </Link>
              {" "}for Sudbury, Boxborough & Coconut Creek locations
            </p>
          </div>
          
          <div className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0 lg:grid-cols-4">
            {locations.map((location, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`relative group bg-white rounded-2xl hover:shadow-lg transition-all duration-300 border ${
                  location.isPrimary 
                    ? 'border-[#E73992] bg-gradient-to-br from-[#FFF9FC] to-white p-5' 
                    : 'border-gray-100 hover:border-[#FCD1E6] p-4 sm:p-5'
                }`}
              >
                {/* Primary Badge */}
                {location.isPrimary && (
                  <div className="absolute -top-2 -right-2 bg-[#E73992] text-white text-xs px-2 py-1 rounded-full shadow-md">
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                      Main
                    </span>
                  </div>
                )}

                {/* External Site Indicator */}
                {location.hasExternalSite && (
                  <div className="absolute -top-2 -left-2">
                    {/* <IconExternalLink size={14} className="text-[#E73992]" /> */}
                  </div>
                )}

                {/* Location Name */}
                <h4 className={`font-bold text-gray-800 pr-8 ${location.isPrimary ? 'mb-3' : 'mb-2 text-sm sm:text-base sm:mb-3'}`}>
                  {location.name}
                </h4>

                {/* Compact Info */}
                <div className={`space-y-2 text-sm ${!location.isPrimary && 'sm:block'}`}>
                  {/* Address */}
                  <div className="flex items-start gap-2">
                    <IconMapPin size={16} className="text-[#E73992] flex-shrink-0 mt-0.5" />
                    <p className="text-gray-600 text-xs leading-relaxed">{location.address}</p>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-2">
                    <IconClock size={16} className="text-[#E73992] flex-shrink-0 mt-0.5" />
                    <div className="text-xs text-gray-600">
                      <p>{location.hours.weekdays}</p>
                      <p className="text-gray-500">{location.hours.sunday}</p>
                    </div>
                  </div>

                  {/* Phone (if available) */}
                  {location.phone && (
                    <div className="flex items-center gap-2">
                      <IconPhone size={16} className="text-[#E73992]" />
                      <a 
                        href={`tel:${location.phone}`}
                        className="text-gray-600 hover:text-[#E73992] transition-colors text-xs"
                      >
                        {location.phone}
                      </a>
                    </div>
                  )}
                </div>

                {/* Services Tags - Show all services */}
                <div className={`pt-3 border-t border-gray-100 ${!location.isPrimary ? 'mt-2 sm:mt-3' : 'mt-3'}`}>
                  <div className="flex flex-wrap gap-1">
                    {location.features.map((feature, featureIdx) => (
                      <span 
                        key={featureIdx}
                        className={`bg-[#FFF0F7] text-[#E73992] px-2 py-0.5 rounded-full ${
                          location.isPrimary ? 'text-[11px]' : 'text-[10px]'
                        }`}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Get Directions Button - Single action button */}
                <div className={`${location.isPrimary ? 'mt-4' : 'mt-3 sm:mt-4'}`}>
                  <a 
                    href={location.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full bg-[#FFF0F7] text-[#E73992] rounded-lg font-medium hover:bg-[#FCD1E6] transition-colors text-center flex items-center justify-center gap-2 ${
                      location.isPrimary ? 'py-2.5 px-4 text-sm' : 'py-2 px-3 text-xs sm:py-2.5 sm:px-4 sm:text-sm'
                    }`}
                  >
                    <IconMapPin size={location.isPrimary ? 16 : 14} className="sm:w-[16px] sm:h-[16px]" />
                    Get Directions
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} PinkDog Pet Resort. All rights reserved.
            </div>
            
            {/* Legal Links */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
              {legalLinks.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className="text-gray-500 hover:text-[#E73992] transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            {/* Powered By Section */}
            <div className="flex flex-col items-center gap-1 mt-4 md:mt-0 pb-4 md:pb-0">
              <p className="text-xs text-gray-500">
                Made with <span className="text-red-500">❤️</span> for pet businesses
              </p>
              <Link
                href="https://petquantic.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-[#E73992] text-sm font-medium transition-colors"
              >
                Powered by PetQuantic
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
