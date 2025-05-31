"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IconPlus, IconPhone, IconMail, IconBrandWhatsapp, IconClock, IconMapPin, IconCalendarEvent, IconPaw } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

interface FAQSection {
  title: string;
  icon: React.ReactNode;
  items: FAQItem[];
}

const faqSections: FAQSection[] = [
  {
    title: "General Questions",
    icon: "🐾",
    items: [
      {
        question: "What services do you offer at PinkDog Pet Resort?",
        answer: (
          <div className="space-y-3">
            <p className="text-gray-700 leading-relaxed">
              We offer a comprehensive range of premium pet care services:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-[#E73992] rounded-full mt-2"></div>
                <div>
                  <span className="font-semibold text-gray-800">Luxury Dog Boarding</span>
                  <p className="text-sm text-gray-600">Comfortable overnight stays</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-[#E73992] rounded-full mt-2"></div>
                <div>
                  <span className="font-semibold text-gray-800">Dog Daycare</span>
                  <p className="text-sm text-gray-600">Supervised playtime & activities</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-[#E73992] rounded-full mt-2"></div>
                <div>
                  <span className="font-semibold text-gray-800">Professional Grooming</span>
                  <p className="text-sm text-gray-600">Full grooming & spa services</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-[#E73992] rounded-full mt-2"></div>
                <div>
                  <span className="font-semibold text-gray-800">Van Transportation</span>
                  <p className="text-sm text-gray-600">Pick-up & drop-off service</p>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        question: "Where are you located?",
        answer: (
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <IconMapPin size={24} className="text-[#E73992] flex-shrink-0 mt-1" />
              <div>
                <p className="text-gray-700 leading-relaxed">
                  We&apos;re conveniently located in <span className="font-semibold text-gray-800">Harvard, MA</span>, right off Route 2.
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Easy access for families across Central Massachusetts!
                </p>
              </div>
            </div>
            <div className="bg-[#FFF0F7] rounded-lg p-3 border border-[#FCD1E6]">
              <p className="text-sm text-gray-700">
                📍 Perfect location for quick drop-offs and pick-ups during your commute
              </p>
            </div>
          </div>
        )
      },
      {
        question: "What are your business hours?",
        answer: (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <IconClock size={24} className="text-[#E73992] flex-shrink-0 mt-1" />
              <div className="flex-1">
                <p className="font-semibold text-gray-800 mb-3">Regular Business Hours:</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center bg-[#FFF9FC] rounded-lg p-3">
                    <span className="font-medium text-gray-700">Monday–Friday</span>
                    <span className="text-[#E73992] font-semibold">7:30 AM – 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#FFF9FC] rounded-lg p-3">
                    <span className="font-medium text-gray-700">Saturday</span>
                    <span className="text-[#E73992] font-semibold">8:00 AM – 5:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#FFF9FC] rounded-lg p-3">
                    <span className="font-medium text-gray-700">Sunday</span>
                    <div className="text-right">
                      <span className="text-[#E73992] font-semibold">9:00 AM – 12:00 PM</span>
                      <p className="text-xs text-gray-600">(pick-up only)</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-3 italic">
                  ⚠️ Hours may vary on holidays
                </p>
              </div>
            </div>
          </div>
        )
      },
      {
        question: "How can I contact you?",
        answer: (
          <div className="space-y-4">
            <p className="text-gray-700 font-medium">Get in touch with us through any of these channels:</p>
            <div className="space-y-3">
              <a href="tel:978-772-4242" className="flex items-center gap-3 bg-[#FFF9FC] rounded-lg p-4 hover:bg-[#FFF0F7] transition-colors group">
                <div className="w-12 h-12 bg-[#E73992] rounded-full flex items-center justify-center">
                  <IconPhone size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 group-hover:text-[#E73992] transition-colors">Call Us</p>
                  <p className="text-[#E73992] font-bold text-lg">978-772-4242</p>
                </div>
              </a>
              
              <a href="https://wa.me/9549140128" className="flex items-center gap-3 bg-[#FFF9FC] rounded-lg p-4 hover:bg-[#FFF0F7] transition-colors group">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <IconBrandWhatsapp size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 group-hover:text-green-600 transition-colors">Text/WhatsApp</p>
                  <p className="text-green-600 font-bold text-lg">954-914-0128</p>
                </div>
              </a>
              
              <a href="mailto:pinkdogpetresort@gmail.com" className="flex items-center gap-3 bg-[#FFF9FC] rounded-lg p-4 hover:bg-[#FFF0F7] transition-colors group">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <IconMail size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">Email Us</p>
                  <p className="text-blue-600 font-bold break-all">pinkdogpetresort@gmail.com</p>
                </div>
              </a>
            </div>
          </div>
        )
      }
    ]
  },
  {
    title: "Van Transportation",
    icon: "🚐",
    items: [
      {
        question: "Do you offer transportation services?",
        answer: (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#E73992] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xl">✓</span>
              </div>
              <div>
                <p className="text-gray-700 leading-relaxed">
                  <span className="font-bold text-gray-800">Yes!</span> We offer convenient pick-up and drop-off van service for:
                </p>
                <ul className="mt-2 space-y-1">
                  <li className="flex items-center gap-2 text-gray-700">
                    <span className="text-[#E73992]">•</span> Daycare appointments
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <span className="text-[#E73992]">•</span> Boarding stays
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <span className="text-[#E73992]">•</span> Grooming appointments
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 font-medium">
                💡 Perfect for busy pet parents who need help with transportation!
              </p>
            </div>
          </div>
        )
      },
      {
        question: "What areas do you serve with the van?",
        answer: (
          <div className="space-y-3">
            <p className="text-gray-700 leading-relaxed">
              Our van service covers <span className="font-semibold text-gray-800">Harvard and surrounding towns</span>.
            </p>
            <div className="bg-[#FFF0F7] rounded-lg p-4 border border-[#FCD1E6]">
              <p className="font-medium text-gray-800 mb-2">📍 Service Area Includes:</p>
              <p className="text-gray-700 text-sm">
                Harvard, Ayer, Littleton, Lancaster, Bolton, and nearby areas
              </p>
            </div>
            <p className="text-sm text-gray-600 italic">
              Not sure if we service your area? Contact us to confirm availability!
            </p>
          </div>
        )
      },
      {
        question: "How do I schedule the van?",
        answer: (
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Scheduling van service is easy! Just follow these steps:
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#E73992] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                <p className="text-gray-700">Book your pet&apos;s appointment (daycare, boarding, or grooming)</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#E73992] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                <p className="text-gray-700">Let us know you need van service when booking</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#E73992] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                <p className="text-gray-700">We&apos;ll coordinate pick-up and drop-off times with you</p>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-blue-800 text-sm">
                💬 You can request van service via phone, text, or email!
              </p>
            </div>
          </div>
        )
      },
      {
        question: "Is there an extra charge for the van?",
        answer: (
          <div className="space-y-3">
            <p className="text-gray-700 leading-relaxed">
              Yes, there is a <span className="font-semibold">small transportation fee</span> based on distance from our facility.
            </p>
            <div className="bg-[#FFF9FC] rounded-lg p-4 border border-[#FCD1E6]">
              <p className="font-medium text-gray-800 mb-2">💰 Pricing Structure:</p>
              <ul className="space-y-1 text-gray-700 text-sm">
                <li>• Fee varies by location</li>
                <li>• Round-trip discounts available</li>
                <li>• Multiple pet discounts</li>
              </ul>
            </div>
            <p className="text-sm text-gray-600 font-medium">
              📞 Contact us for an exact quote based on your location!
            </p>
          </div>
        )
      }
    ]
  },
  {
    title: "Boarding & Daycare",
    icon: "🏨",
    items: [
      {
        question: "What should I bring for boarding?",
        answer: (
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed font-medium">
              Pack these essentials for your pet&apos;s stay:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-[#FFF0F7] rounded-lg p-4 border border-[#FCD1E6]">
                <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <span className="text-2xl">🍖</span> Food & Treats
                </h4>
                <p className="text-sm text-gray-700">Your dog&apos;s regular food and any special treats they love</p>
              </div>
              <div className="bg-[#FFF0F7] rounded-lg p-4 border border-[#FCD1E6]">
                <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <span className="text-2xl">🧸</span> Comfort Items
                </h4>
                <p className="text-sm text-gray-700">Favorite toy or blanket with familiar scents</p>
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 font-medium">
                ✨ We provide everything else: bedding, bowls, toys, and lots of love!
              </p>
            </div>
          </div>
        )
      },
      {
        question: "What's included in daycare?",
        answer: (
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Our daycare program is designed to keep your pet happy, healthy, and engaged all day!
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <IconPaw size={24} className="text-[#E73992] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-800">Supervised Group Play</h4>
                  <p className="text-sm text-gray-600">Safe socialization with friends their size</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <IconClock size={24} className="text-[#E73992] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-800">Structured Schedule</h4>
                  <p className="text-sm text-gray-600">Rest breaks, potty time, and quiet time</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <IconCalendarEvent size={24} className="text-[#E73992] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-800">Enrichment Activities</h4>
                  <p className="text-sm text-gray-600">Puzzles, games, and training reinforcement</p>
                </div>
              </div>
            </div>
            <div className="bg-[#FFF0F7] rounded-lg p-4 text-center">
              <p className="text-[#E73992] font-bold">
                💕 Plus lots of love, attention, and belly rubs!
              </p>
            </div>
          </div>
        )
      },
      {
        question: "What is the price for daycare?",
        answer: (
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Our daycare pricing is flexible to meet your needs:
            </p>
            <div className="bg-[#FFF9FC] rounded-lg p-4 border border-[#FCD1E6]">
              <h4 className="font-bold text-gray-800 mb-3">💰 Pricing Options:</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-[#E73992] font-bold">•</span>
                  <span className="text-gray-700"><strong>Half-Day</strong> visits</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#E73992] font-bold">•</span>
                  <span className="text-gray-700"><strong>Full-Day</strong> visits</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#E73992] font-bold">•</span>
                  <span className="text-gray-700"><strong>Package deals</strong> for regular visitors</span>
                </li>
              </ul>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 font-medium text-sm">
                📧 Email pinkdogpetresort@gmail.com or call/text us for current rates and package options!
              </p>
            </div>
          </div>
        )
      },
      {
        question: "Do I need a reservation for daycare?",
        answer: (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xl">!</span>
              </div>
              <div>
                <p className="font-bold text-gray-800 text-lg">Yes, reservations are required!</p>
                <p className="text-gray-700 mt-1">This helps us maintain:</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ml-13">
              <div className="bg-white border border-gray-200 rounded-lg p-3">
                <p className="font-medium text-gray-800">✅ Proper staff-to-dog ratio</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-3">
                <p className="font-medium text-gray-800">✅ Safe play groups</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-3">
                <p className="font-medium text-gray-800">✅ Adequate space</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-3">
                <p className="font-medium text-gray-800">✅ Personalized care</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 italic">
              💡 Book early to secure your spot, especially during holidays!
            </p>
          </div>
        )
      }
    ]
  },
  {
    title: "Grooming & Spa",
    icon: "🐶",
    items: [
      {
        question: "What grooming services are available?",
        answer: (
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed font-medium">
              We offer a full range of professional grooming services:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-gradient-to-br from-[#FFF0F7] to-[#FFF9FC] rounded-lg p-4 border border-[#FCD1E6]">
                <h4 className="font-bold text-gray-800 mb-2">✂️ Basic Grooming</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Bath & blow-dry</li>
                  <li>• Nail trimming</li>
                  <li>• Ear cleaning</li>
                  <li>• Teeth brushing</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-[#FFF0F7] to-[#FFF9FC] rounded-lg p-4 border border-[#FCD1E6]">
                <h4 className="font-bold text-gray-800 mb-2">🌟 Premium Services</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Breed-specific cuts</li>
                  <li>• De-shedding treatments</li>
                  <li>• Specialty spa treatments</li>
                  <li>• Hypoallergenic options</li>
                </ul>
              </div>
            </div>
            <div className="bg-[#E73992] bg-opacity-10 rounded-lg p-3 text-center">
              <p className="text-[#E73992] font-bold">
                ✨ All services include a complimentary bandana or bow!
              </p>
            </div>
          </div>
        )
      },
      {
        question: "Do I need an appointment for grooming?",
        answer: (
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <IconCalendarEvent size={24} className="text-[#E73992] flex-shrink-0 mt-1" />
              <div>
                <p className="font-bold text-gray-800 text-lg">Yes, appointments are recommended!</p>
                <p className="text-gray-700 mt-1">
                  Booking in advance helps ensure:
                </p>
              </div>
            </div>
            <ul className="ml-10 space-y-2">
              <li className="flex items-center gap-2 text-gray-700">
                <span className="text-green-500">✓</span> Your preferred date and time
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <span className="text-green-500">✓</span> Adequate time for your pet&apos;s specific needs
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <span className="text-green-500">✓</span> Personalized grooming consultation
              </li>
            </ul>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-yellow-800 text-sm">
                ⚡ Same-day appointments may be available - call to check!
              </p>
            </div>
          </div>
        )
      },
      {
        question: "Can you groom dogs with skin sensitivities?",
        answer: (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xl">✓</span>
              </div>
              <div>
                <p className="font-bold text-gray-800 text-lg">Absolutely!</p>
                <p className="text-gray-700">We specialize in caring for sensitive pets.</p>
              </div>
            </div>
            <div className="bg-[#FFF0F7] rounded-lg p-4 border border-[#FCD1E6]">
              <h4 className="font-bold text-gray-800 mb-3">🌿 Our Gentle Approach Includes:</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-[#E73992] mt-1">•</span>
                  <div>
                    <p className="font-medium text-gray-800">Hypoallergenic shampoos</p>
                    <p className="text-sm text-gray-600">Free from harsh chemicals</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#E73992] mt-1">•</span>
                  <div>
                    <p className="font-medium text-gray-800">Natural ingredients</p>
                    <p className="text-sm text-gray-600">Aloe vera & oatmeal formulas</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#E73992] mt-1">•</span>
                  <div>
                    <p className="font-medium text-gray-800">Customized care</p>
                    <p className="text-sm text-gray-600">Tailored to your dog&apos;s specific needs</p>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 italic text-center">
              💝 We&apos;ll work with you to ensure your pet&apos;s comfort throughout the grooming process!
            </p>
          </div>
        )
      }
    ]
  },
  {
    title: "Policies & Booking",
    icon: "💬",
    items: [
      {
        question: "What vaccinations are required?",
        answer: (
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              To keep all pets safe and healthy, we require:
            </p>
            <div className="space-y-3">
              <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
                <h4 className="font-bold text-red-800 mb-2">🔴 Required Vaccinations:</h4>
                <ul className="space-y-1 text-red-700">
                  <li className="flex items-center gap-2">
                    <span className="font-bold">•</span> Rabies
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="font-bold">•</span> Distemper (DHPP)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="font-bold">•</span> Bordetella (Kennel Cough)
                  </li>
                </ul>
              </div>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-4">
                <h4 className="font-bold text-yellow-800 mb-2">🟡 Recommended:</h4>
                <ul className="space-y-1 text-yellow-700">
                  <li className="flex items-center gap-2">
                    <span className="font-bold">•</span> Canine Influenza (during flu season)
                  </li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-gray-600 italic">
              📋 Please bring vaccination records for your first visit!
            </p>
          </div>
        )
      },
      {
        question: "How do I book a service?",
        answer: (
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed font-medium">
              Booking is easy! Choose your preferred method:
            </p>
            <div className="space-y-3">
              <a href="tel:978-772-4242" className="block bg-gradient-to-r from-[#FFF0F7] to-[#FFF9FC] rounded-lg p-4 border border-[#FCD1E6] hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <IconPhone size={20} className="text-[#E73992]" />
                    <span className="font-bold text-gray-800">Call Us</span>
                  </div>
                  <span className="text-[#E73992] font-bold">978-772-4242</span>
                </div>
              </a>
              <a href="sms:954-914-0128" className="block bg-gradient-to-r from-[#FFF0F7] to-[#FFF9FC] rounded-lg p-4 border border-[#FCD1E6] hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <IconBrandWhatsapp size={20} className="text-green-600" />
                    <span className="font-bold text-gray-800">Text/WhatsApp</span>
                  </div>
                  <span className="text-green-600 font-bold">954-914-0128</span>
                </div>
              </a>
              <a href="mailto:pinkdogpetresort@gmail.com" className="block bg-gradient-to-r from-[#FFF0F7] to-[#FFF9FC] rounded-lg p-4 border border-[#FCD1E6] hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <IconMail size={20} className="text-blue-600" />
                    <span className="font-bold text-gray-800">Email</span>
                  </div>
                  <span className="text-blue-600 font-bold text-sm">pinkdogpetresort@gmail.com</span>
                </div>
              </a>
            </div>
          </div>
        )
      },
      {
        question: "What's your cancellation policy?",
        answer: (
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              We understand plans change! Please notify us as soon as possible:
            </p>
            <div className="space-y-3">
              <div className="bg-white border-2 border-[#FCD1E6] rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <IconClock size={24} className="text-[#E73992] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-800">Daycare & Grooming</h4>
                    <p className="text-gray-700">24 hours notice required</p>
                  </div>
                </div>
              </div>
              <div className="bg-white border-2 border-[#FCD1E6] rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <IconCalendarEvent size={24} className="text-[#E73992] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-800">Boarding</h4>
                    <p className="text-gray-700">48 hours notice required</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-800 text-sm">
                ⚠️ Late cancellations may incur a fee to cover staffing costs
              </p>
            </div>
          </div>
        )
      },
      {
        question: "Are there breed or size restrictions?",
        answer: (
          <div className="space-y-4">
            <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-2xl">🐕</span>
                </div>
                <div>
                  <p className="font-bold text-green-800 text-lg">We welcome ALL breeds and sizes!</p>
                  <p className="text-green-700 mt-1">From tiny Chihuahuas to giant Great Danes</p>
                </div>
              </div>
            </div>
            <div className="bg-[#FFF0F7] rounded-lg p-4 border border-[#FCD1E6]">
              <h4 className="font-bold text-gray-800 mb-2">🎯 Our Only Requirement:</h4>
              <p className="text-gray-700">
                All dogs must pass a <span className="font-semibold">temperament assessment</span> before joining group activities.
              </p>
              <p className="text-sm text-gray-600 mt-2">
                This ensures a safe, fun environment for everyone!
              </p>
            </div>
            <p className="text-center text-[#E73992] font-bold">
              💕 Every dog is special, and we treat them that way!
            </p>
          </div>
        )
      }
    ]
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleFAQ = (sectionIndex: number, itemIndex: number) => {
    const key = `${sectionIndex}-${itemIndex}`;
    setOpenIndex(openIndex === key ? null : key);
  };

  return (
    <main className="bg-white relative">
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 overflow-hidden bg-gradient-to-b from-[#FFF0F7] to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Frequently Asked <span className="text-[#E73992]">Questions</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-600"
          >
            Find answers to common questions about PinkDog Pet Resort
          </motion.p>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {faqSections.map((section, sectionIndex) => (
            <motion.div
              key={sectionIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-3xl">{section.icon}</span>
                {section.title}
              </h2>

              <div className="space-y-4">
                {section.items.map((item, itemIndex) => {
                  const isOpen = openIndex === `${sectionIndex}-${itemIndex}`;
                  
                  return (
                    <motion.div
                      key={itemIndex}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: itemIndex * 0.05 }}
                      viewport={{ once: true }}
                      className="bg-white rounded-xl border border-[#FCD1E6] overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      <button
                        className="w-full px-6 py-4 flex items-center gap-3 text-left hover:bg-[#FFF9FC] transition-colors"
                        onClick={() => toggleFAQ(sectionIndex, itemIndex)}
                        aria-expanded={isOpen}
                      >
                        <motion.div
                          initial={false}
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          className="rounded-full bg-[#FDF2F8] p-1 flex items-center justify-center flex-shrink-0"
                        >
                          <IconPlus size={18} className="text-[#E73992]" />
                        </motion.div>
                        <h3 className="text-lg font-medium text-gray-900 flex-1">
                          {item.question}
                        </h3>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: 0.3,
                              type: "spring",
                              stiffness: 400,
                              damping: 40
                            }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-5 pl-14 text-gray-700">
                              {item.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-r from-[#E73992] to-[#FF69B4] relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Still have questions?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              We&apos;re here to make your dog&apos;s stay safe, fun, and stress-free!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <div className="flex items-center gap-2 text-white">
                <IconPhone size={20} />
                <span className="font-medium">978-772-4242</span>
              </div>
              <div className="hidden sm:block text-white">•</div>
              <div className="flex items-center gap-2 text-white">
                <IconBrandWhatsapp size={20} />
                <span className="font-medium">954-914-0128</span>
              </div>
              <div className="hidden sm:block text-white">•</div>
              <div className="flex items-center gap-2 text-white">
                <IconMail size={20} />
                <span className="font-medium">pinkdogpetresort@gmail.com</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-[#E73992] hover:bg-gray-100 rounded-full px-8 py-6 text-lg font-semibold"
                asChild
              >
                <Link href="/contact">Contact Us Now</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white/10 rounded-full px-8 py-6 text-lg font-semibold"
                asChild
              >
                <Link href="/booking">Book a Service</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
