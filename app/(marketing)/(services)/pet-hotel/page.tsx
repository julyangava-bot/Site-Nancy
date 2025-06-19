"use client";

import React, { useEffect, useState } from "react";
import { PetHotelBookingForm } from "@/components/pinkdog/pet-hotel-booking-form";
import { Clock, Heart, Users, Cat, Home, Activity } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function PetHotelPage() {
  const searchParams = useSearchParams();
  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    const booking = searchParams.get('booking');
    if (booking === 'true') {
      setShowBookingForm(true);
    }
  }, [searchParams]);
  const features = [
    {
      icon: <Home className="w-7 h-7" />,
      title: "🛏 Private Climate-Controlled Suites",
      description: "Each pet enjoys their own space with soft bedding, clean surroundings, and constant temperature regulation."
    },
    {
      icon: <Heart className="w-7 h-7" />,
      title: "💗 Daily Health & Wellness Monitoring",
      description: "Our trained staff conducts daily check-ins, ensuring every guest is healthy, eating well, and emotionally settled."
    },
    {
      icon: <Clock className="w-7 h-7" />,
      title: "⏰ Tailored Feeding & Medication Schedules",
      description: "We follow your instructions for meals, treats, supplements, and medications to maintain their routine."
    },
    {
      icon: <Users className="w-7 h-7" />,
      title: "🐾 Safe, Supervised Group Play",
      description: "Carefully monitored play sessions with temperament-matched dogs for social interaction and confidence building."
    },
    {
      icon: <Activity className="w-7 h-7" />,
      title: "🧠 Mental & Emotional Stimulation",
      description: "Interactive toys, group activities, and fresh routines to prevent boredom and anxiety."
    },
    {
      icon: <Cat className="w-7 h-7" />,
      title: "🐱 Dedicated Cat Comfort Area",
      description: "Quiet, separate cat suite area with cozy nooks, toys, and peaceful environment designed for tranquility."
    }
  ];

  const benefits = [
    "Private, climate-controlled pet suites with soft bedding",
    "24/7 monitored facility with trained staff supervision",
    "Personalized feeding and medication administration",
    "Safe social interaction with temperament-matched pets",
    "Mental stimulation through interactive toys and activities",
    "Separate quiet areas for cats with specialized care",
    "Spacious indoor & outdoor play yards",
    "Add-on spa or grooming services during stay",
    "Easy parking and drop-off access",
    "One-on-one enrichment for pets needing individual attention"
  ];

  const whyChoosePinkDog = [
    "Science-based care combined with deep love for animals",
    "Over 23 years of experience in professional pet care",
    "Latin women-led business that values trust and community",
    "Structured social interaction that builds confidence and improves behavior",
    "Stress-free environment that mirrors home routines",
    "Gentle introductions for pets who prefer solitude or need time to adjust"
  ];



  return (
    <main className="bg-white relative min-h-screen">
      {/* Custom Hero Section with Booking Form */}
      <section className="relative pt-30 sm:pt-36 pb-8 sm:pb-12">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF0F7] to-white"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-1">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                Pet <span className="text-[#E73992]">Hotel</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                Comfort. Care. Companionship. When you&apos;re away, your pet deserves a place where they&apos;ll be not only safe—but genuinely happy. Our overnight hotel offers a stress-free, cozy environment where dogs and cats can rest, play, and enjoy companionship in a well-supervised, loving atmosphere.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <PetHotelBookingForm>
                  Book Pet Hotel
                </PetHotelBookingForm>
                <Link
                  href="/#checkin-info"
                  className="border-2 border-[#E73992] text-[#E73992] hover:bg-[#FFF0F7] rounded-full px-6 sm:px-8 py-3 text-base sm:text-lg font-medium transition-colors inline-flex items-center justify-center whitespace-nowrap"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/services/pet-hotel-card.png"
                  alt="Pet Hotel service"
                  fill
                  className="object-contain"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#FCD1E6] rounded-full opacity-50 blur-xl hidden sm:block"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#FFEBF5] rounded-full opacity-50 blur-xl hidden sm:block"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-[#FFF9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our <span className="text-[#E73992]">Pet Hotel</span>?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-14 h-14 bg-[#FCD1E6] rounded-xl flex items-center justify-center mb-4 text-[#E73992]">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">
                Our <span className="text-[#E73992]">Services</span>
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 bg-[#E73992] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-700">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Image
                src="/images/pinkdog-happy-pets.jpg"
                alt="Happy pets at PinkDog"
                width={600}
                height={400}
                className="rounded-2xl shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-b from-white to-[#FFF9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              <span className="inline-flex items-center gap-2">
                <svg className="w-8 h-8 text-[#E73992]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                How It <span className="text-[#E73992]">Works</span>
              </span>
            </h2>
          </motion.div>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {whyChoosePinkDog.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  <div className="w-8 h-8 bg-[#E73992] rounded-full flex items-center justify-center flex-shrink-0 text-white font-semibold">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 text-lg">{step}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Area Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              🌿 Our Facility Features
            </h2>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              We combine science-based care, a deep love for animals, and over 23 years of experience to ensure your pet&apos;s stay is as enjoyable as possible. Leaving your pet doesn&apos;t have to be stressful—with us, it&apos;s a positive, engaging experience that supports their physical and emotional well-being.
            </p>
          </motion.div>
        </div>
      </section>
        
        {/* Custom CTA Section with Booking Form */}
        <section className="py-20 bg-gradient-to-r from-[#E73992] to-[#FF69B4] relative">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Give Your Pet the Best Care?
              </h2>
              <p className="text-base sm:text-xl text-white/90 mb-6 sm:mb-8">
                Book your pet&apos;s hotel stay today and see why PinkDog is the preferred choice for pet parents.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <PetHotelBookingForm variant="cta" initialOpen={showBookingForm}>
                  Book Pet Hotel
                </PetHotelBookingForm>
                <Link
                  href="/faq"
                  className="inline-flex items-center justify-center bg-transparent text-white border-2 border-white hover:bg-white/10 rounded-full px-8 py-4 text-lg font-semibold transition-colors"
                >
                  Have Questions?
                </Link>
              </div>
            </div>
          </div>
        </section>
    </main>
  );
} 