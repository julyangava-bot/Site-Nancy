"use client";

import React from "react";
import { ServicePageLayout } from "@/components/service-page-layout";
import { Heart, Home, Gamepad2, Sparkles, Trees, Car, Hotel, Cat, Dog, Tag, Package, Clock, Scissors, Utensils, Pill, Calendar, Truck, Check, PawPrint } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DaycarePage() {
  const features = [
    {
      icon: <Home className="w-7 h-7" />,
      title: "Luxury Suites",
      description: "Climate-controlled, plush bedding, and peaceful rest for dogs and cats."
    },
    {
      icon: <Gamepad2 className="w-7 h-7" />,
      title: "Enrichment & Play",
      description: "Group and individual activities tailored by size and temperament."
    },
    {
      icon: <Sparkles className="w-7 h-7" />,
      title: "Spa & Wellness",
      description: "Grooming, relaxation, and care to keep your pet feeling their best."
    },
    {
      icon: <Trees className="w-7 h-7" />,
      title: "Spacious Outdoor Yards",
      description: "Secure play spaces designed for fun, freedom, and fresh air."
    },
    {
      icon: <Heart className="w-7 h-7" />,
      title: "Loving, Skilled Staff",
      description: "Passionate caregivers who treat your pet like one of their own."
    },
    {
      icon: <Car className="w-7 h-7" />,
      title: "PinkVan Services",
      description: "Available pick-up and drop-off transportation for your convenience."
    }
  ];

  const benefits = [
    "Physical Exercise - Active play helps maintain healthy weight and heart health",
    "Socialization Skills - Daily interaction strengthens social behavior",
    "Mental Stimulation - New experiences keep your dog's mind sharp",
    "Emotional Well-Being - Positive group play lifts mood and reduces stress",
    "Better Behavior at Home - Learning communication develops confidence",
    "Stronger Immune System - Regular movement and joy support overall health",
    "Large, secure indoor & outdoor play spaces",
    "Climate-controlled environment for year-round comfort",
    "Small group sizes for individualized care",
    "Clean, sanitized facility with structured routines",
    "Easy drop-off and pick-up with ample parking"
  ];

  const whyChooseDaycare = [
    "Physical Exercise - Active play helps your dog maintain a healthy weight, stay agile, and support heart health",
    "Socialization Skills - Daily interaction with other dogs strengthens social behavior, reducing anxiety and reactivity over time", 
    "Mental Stimulation - New experiences, toys, games, and playmates keep your dog's mind sharp and prevent boredom-driven behaviors",
    "Emotional Well-Being - Dogs are pack animals, and positive group play can lift their mood, ease separation anxiety, and reduce stress",
    "Better Behavior at Home - Learning canine communication helps your dog develop manners and confidence both in and out of daycare",
    "Stronger Immune System - Just like humans, dogs benefit from regular movement, stimulation, and joy to support overall health"
  ];

  const pricing = [
    {
      title: "Full Day",
      price: "$45",
      period: "6+ hours",
      features: [
        "Full day of supervised play",
        "Group activities and socialization",
        "Indoor and outdoor play areas",
        "Climate-controlled environment",
        "Experienced staff supervision"
      ]
    },
    {
      title: "5-Day Pass",
      price: "$205",
      period: "Full Day",
      features: [
        "Save $20 with multi-day pass",
        "Perfect for weekly routine",
        "All Full Day benefits included",
        "Flexible scheduling"
      ]
    },
    {
      title: "10-Day Pass",
      price: "$400",
      period: "Full Day", 
      features: [
        "Save $50 with bulk pass",
        "Best value option",
        "All Full Day benefits included",
        "Extended validity period"
      ]
    },
    {
      title: "Half Day",
      price: "$30",
      period: "3-4 hours",
      features: [
        "Perfect for younger dogs",
        "Shorter play sessions",
        "Same quality care",
        "Great introduction option"
      ]
    },
    {
      title: "5-Day Pass",
      price: "$135",
      period: "Half Day",
      features: [
        "Save $15 with multi-day pass",
        "All Half Day benefits included",
        "Flexible scheduling"
      ]
    },
    {
      title: "10-Day Pass", 
      price: "$260",
      period: "Half Day",
      features: [
        "Save $40 with bulk pass",
        "Best value for half days",
        "Extended validity period"
      ]
    }
  ];

  return (
    <>
      <ServicePageLayout
        title="Daycare"
        subtitle="Services"
        description="Nurturing Pets, Strengthening Bonds, and Celebrating Happiness—The PinkDog Way. At PinkDog Pet Resort, our daycare program offers more than just supervision—it provides a vibrant, enriching experience designed to support your dog's physical, mental, and emotional health. With spacious indoor and outdoor climate-controlled play areas, our facility is the perfect environment for dogs to run, play, and engage with others in a safe and structured setting."
        heroImage="/images/services/daycare-card.jpg"
        features={features}
        benefits={benefits}
        howItWorks={whyChooseDaycare}
        pricing={pricing}
        serviceArea={{
          title: "✨ Designed for Joy & Peace of Mind",
          description: "Our experienced and caring staff supervises all play sessions to ensure safety, encourage appropriate behavior, and provide lots of love and attention throughout the day. Whether your pup is high-energy or prefers gentle play, we tailor group activities based on temperament and size to ensure every dog feels comfortable and included."
        }}
        ctaText="Book Daycare"
        ctaLink="https://booking.appointy.com/en-US/pinkdogresort/bookings/service"
        hideCTA={true}
      />

      {/* Boarding Rates Section */}
      <section className="py-12 sm:py-20 bg-gradient-to-b from-white to-[#FFF9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              <span className="inline-flex items-center gap-2">
                <Hotel className="w-8 h-8 text-[#E73992]" />
                <span className="text-[#E73992]">Boarding Rates</span>
              </span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Comfortable overnight stays with luxury accommodations and personalized care
            </p>
          </motion.div>

          {/* Dog Boarding Rates */}
          <div className="mb-12 sm:mb-16">
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 text-center"
            >
              <span className="inline-flex items-center gap-2 justify-center">
                <Dog className="w-6 h-6 text-[#E73992]" />
                Boarding Rates (per Dog)
              </span>
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base"
            >
              * Required $55 deposit fee to place reservation
            </motion.p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
              {/* Bronze Package */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#FCD1E6] group"
              >
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#CD7F32] to-[#B87333] rounded-full mx-auto mb-3"></div>
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-[#E73992] transition-colors">Bronze</h4>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-bold text-[#E73992]">$55</span>
                    <span className="text-gray-600">/day</span>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#E73992] mt-0.5 flex-shrink-0" />
                    <span>Potty breaks AM, midday and PM</span>
                  </li>
                </ul>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#CD7F32] to-[#B87333] rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>

              {/* Silver Package */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#FCD1E6] group"
              >
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#C0C0C0] to-[#A8A8A8] rounded-full mx-auto mb-3"></div>
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-[#E73992] transition-colors">Silver</h4>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-bold text-[#E73992]">$65</span>
                    <span className="text-gray-600">/day</span>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#E73992] mt-0.5 flex-shrink-0" />
                    <span>Potty breaks AM, midday and PM</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#E73992] mt-0.5 flex-shrink-0" />
                    <span>Midday playtime (15-20 min)</span>
                  </li>
                </ul>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C0C0C0] to-[#A8A8A8] rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>

              {/* Gold Package */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#FCD1E6] group"
              >
                <div className="absolute -top-3 right-4 bg-[#E73992] text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Popular
                </div>
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-full mx-auto mb-3"></div>
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-[#E73992] transition-colors">Gold</h4>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-bold text-[#E73992]">$70</span>
                    <span className="text-gray-600">/day</span>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#E73992] mt-0.5 flex-shrink-0" />
                    <span>Potty breaks AM, midday and PM</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#E73992] mt-0.5 flex-shrink-0" />
                    <span>Daycare (half-day)</span>
                  </li>
                </ul>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>

              {/* Platinum Package */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#FCD1E6] group"
              >
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#E5E4E2] to-[#BEC2CB] rounded-full mx-auto mb-3 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-[#E73992] transition-colors">Platinum</h4>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-bold text-[#E73992]">$75</span>
                    <span className="text-gray-600">/day</span>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#E73992] mt-0.5 flex-shrink-0" />
                    <span>Potty breaks AM, midday and PM</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#E73992] mt-0.5 flex-shrink-0" />
                    <span>Daycare (full-day)</span>
                  </li>
                </ul>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E5E4E2] to-[#BEC2CB] rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            </div>
          </div>

          {/* Cat Boarding Rates */}
          <div className="mb-12 sm:mb-16">
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 text-center"
            >
              <span className="inline-flex items-center gap-2 justify-center">
                <Cat className="w-6 h-6 text-[#E73992]" />
                Boarding Rates (per Cat)
              </span>
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base"
            >
              * Required $35 deposit fee to place reservation
            </motion.p>
            
            <div className="max-w-sm mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#FCD1E6] group"
              >
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#E73992] to-[#FF69B4] rounded-full mx-auto mb-3 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-[#E73992] transition-colors">Standard</h4>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-bold text-[#E73992]">$35</span>
                    <span className="text-gray-600">/day</span>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-gray-700 text-center">
                  <li className="flex items-center justify-center gap-2">
                    <Check className="w-4 h-4 text-[#E73992] flex-shrink-0" />
                    <span>Premium cat accommodations</span>
                  </li>
                  <li className="text-xs text-gray-600 mt-2">+ $15 for nail trim</li>
                </ul>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E73992] to-[#FF69B4] rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Discounts & Additional Services */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 max-w-6xl mx-auto">
            {/* Discounts */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative bg-gradient-to-br from-[#FFF0F7] to-[#FFF9FC] rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#E73992] rounded-full opacity-5 -mr-16 -mt-16"></div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center gap-2 relative z-10">
                <Tag className="w-6 h-6 text-[#E73992]" />
                <span className="text-[#E73992]">Special Discounts</span>
              </h3>
              <ul className="space-y-4 relative z-10">
                <li className="flex items-start gap-3 bg-white rounded-xl p-3 shadow-sm">
                  <Dog className="w-5 h-5 text-[#E73992] flex-shrink-0 mt-0.5" />
                  <p className="text-sm sm:text-base text-gray-700">
                    <strong>$2 off</strong> per additional pet 
                    <span className="block text-xs text-gray-500 mt-1">(e.g., $53 x 2 for 2 dogs basic package)</span>
                  </p>
                </li>
                <li className="flex items-start gap-3 bg-white rounded-xl p-3 shadow-sm">
                  <Calendar className="w-5 h-5 text-[#E73992] flex-shrink-0 mt-0.5" />
                  <p className="text-sm sm:text-base text-gray-700">
                    <strong>$4/day discount</strong> for stays longer than 10 days
                  </p>
                </li>
                <li className="flex items-start gap-3 bg-white rounded-xl p-3 shadow-sm">
                  <Clock className="w-5 h-5 text-[#E73992] flex-shrink-0 mt-0.5" />
                  <p className="text-sm sm:text-base text-gray-700">
                    <strong>No daily charge</strong> for pickups before 11am
                  </p>
                </li>
                <li className="flex items-start gap-3 bg-white rounded-xl p-3 shadow-sm">
                  <Scissors className="w-5 h-5 text-[#E73992] flex-shrink-0 mt-0.5" />  
                  <p className="text-sm sm:text-base text-gray-700">
                    <strong>No daily charge</strong> for the day of grooming 
                    <span className="text-xs text-gray-500"> (charged service only)</span>
                  </p>
                </li>
              </ul>
            </motion.div>

            {/* Additional Charges */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative bg-gradient-to-br from-[#FFF9FC] to-white rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 group border border-[#FCD1E6] overflow-hidden"
            >
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#FF69B4] rounded-full opacity-5 -ml-20 -mb-20"></div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center gap-2 relative z-10">
                <Package className="w-6 h-6 text-[#E73992]" />
                <span className="text-[#E73992]">Additional Services</span>
              </h3>
              <ul className="space-y-4 relative z-10">
                <li className="flex items-start gap-3 bg-[#FFF0F7] rounded-xl p-3">
                  <Utensils className="w-5 h-5 text-[#E73992] flex-shrink-0 mt-0.5" />
                  <div className="text-sm sm:text-base text-gray-700">
                    <p><strong>Food Service:</strong> $7/day</p>
                    <p className="text-xs text-gray-500 mt-1">Kennel food provided (Iams kibble and canned)</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 bg-[#FFF0F7] rounded-xl p-3">
                  <Pill className="w-5 h-5 text-[#E73992] flex-shrink-0 mt-0.5" />
                  <div className="text-sm sm:text-base text-gray-700">
                    <p><strong>Medication:</strong> $1 per pill/day</p>
                    <p className="text-xs text-gray-500 mt-1">(e.g., 2 pills twice daily = $4/day)</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 bg-[#FFF0F7] rounded-xl p-3">
                  <Calendar className="w-5 h-5 text-[#E73992] flex-shrink-0 mt-0.5" />
                  <div className="text-sm sm:text-base text-gray-700">
                    <p><strong>Peak Day Fees:</strong> $10/day</p>
                    <p className="text-xs text-gray-500 mt-1">Weekends & Holidays</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 bg-[#FFF0F7] rounded-xl p-3">
                  <Truck className="w-5 h-5 text-[#E73992] flex-shrink-0 mt-0.5" />
                  <div className="text-sm sm:text-base text-gray-700">
                    <p><strong>Van Service:</strong> Rate by distance</p>
                    <p className="text-xs text-gray-500 mt-1">Appointment only</p>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section - Final elegante e harmonioso */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-[#E73992] to-[#FF69B4] relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full opacity-5 -ml-36 -mt-36"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full opacity-5 -mr-48 -mb-48"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <PawPrint className="w-12 h-12 text-white/80 mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Give Your Pet the Best Day Ever?
            </h2>
            <p className="text-base sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join the PinkDog family and see why pet parents trust us for daycare, boarding, and more. 
              Your pet&apos;s happiness is just a booking away!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-[#E73992] hover:bg-gray-100 rounded-full px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link href="https://booking.appointy.com/en-US/pinkdogresort/bookings/service" target="_blank" rel="noopener noreferrer">
                  Book Now
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-2 border-white hover:bg-white/10 rounded-full px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold transition-all duration-300"
                asChild
              >
                <Link href="tel:9787724242">
                  Call (978) 772-4242
                </Link>
              </Button>
            </div>
            
          </motion.div>
        </div>
      </section>
    </>
  );
} 