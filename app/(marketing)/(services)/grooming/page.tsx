"use client";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function GroomingPage() {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && searchParams.get('booking') === 'true') {
      window.open("https://booking.appointy.com/en-US/pinkdogresort/bookings/service", "_blank", "noopener,noreferrer");
    }
  }, [mounted, searchParams]);
  return (
    <main className="bg-white relative">
      {/* Hero Section */}
      <section className="relative pt-36 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF0F7] to-white"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-1">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                🐾 Pink Grooming & <span className="text-[#E73992]">Spa Services</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                At PinkDog Pet Resort, grooming is more than a service — it&apos;s a relationship. We take the time to get to know your pet so every visit feels like a spa day, not a stressful experience.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We treat pets like family — because to us, they are. Your dog deserves to be pampered with love and care, and our mission is to return them to you happy, healthy, fresh, and clean.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a
                  href="https://booking.appointy.com/en-US/pinkdogresort/bookings/service"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#E73992] text-white hover:bg-[#d3337f] rounded-full px-6 sm:px-8 py-3 text-base sm:text-lg font-medium transition-colors inline-flex items-center justify-center whitespace-nowrap"
                >
                  Book Spa Day
                </a>
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
              <div className="relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/services/grooming.jpg"
                  alt="Pink Grooming & Spa Services"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Grooming Matters Section */}
      <section className="py-16 bg-gradient-to-b from-white to-[#FFF9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            ✂️ Why <span className="text-[#E73992]">Grooming Matters</span>
          </h2>
          <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
            Grooming isn&apos;t just about looking good — it&apos;s about staying healthy. Here&apos;s why grooming every 4–6 weeks is important:
          </p>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="grid gap-6">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🧼</span>
                  <p className="text-gray-700">Removes loose hair, dander, and environmental allergens</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🐾</span>
                  <p className="text-gray-700">Prevents painful mats and tangles, especially in long coats</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🩺</span>
                  <p className="text-gray-700">Allows early detection of skin issues, bumps, or infections</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🐕</span>
                  <p className="text-gray-700">Helps manage seasonal shedding and keeps your home cleaner</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✂️</span>
                  <p className="text-gray-700">Maintains comfortable coat length for your pet&apos;s lifestyle</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">❤️</span>
                  <p className="text-gray-700">Reduces stress when done regularly in a familiar environment</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/gallery/services/image-21.JPG"
                  alt="Wet dog after grooming bath at PinkDog"
                  width={600}
                  height={500}
                  className="object-cover w-full"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-6">
                  <p className="text-white text-sm font-medium">
                    Fresh from the spa - Happy, clean, and healthy!
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="bg-[#FFF0F7] rounded-2xl p-6 max-w-4xl mx-auto">
            <p className="text-gray-700">
              <strong>Nail care is just as important!</strong> Regular trims every 2–3 weeks help avoid painful overgrowth. When nails get too long, the quick (the blood and nerve supply) grows too — making it difficult to trim back safely. Long nails can lead to posture problems, joint pain, and injury.
            </p>
          </div>
        </div>
      </section>

      {/* First-Time Grooming Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            🐾 First-Time Grooming or <span className="text-[#E73992]">Nervous Dogs?</span>
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            We recommend introducing your puppy to grooming early in life, ideally as soon as your vet gives the okay. Waiting too long can make grooming feel scary — especially when it comes to nails or ears.
          </p>
          <p className="text-lg text-gray-600">
            We offer a special <strong>First Puppy Groom</strong> as well as a <strong>Socialization Day</strong> service — a gentle, low-pressure way to help first-timers, nervous dogs, or rescue pups feel safe and comfortable before their first full groom. These services help set the foundation for a lifetime of relaxed grooming experiences.
          </p>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-20 bg-gradient-to-b from-[#FFF9FC] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ✨ Our <span className="text-[#E73992]">Services Include</span>
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-[#FCD1E6] rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">✂️</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Full Grooming</h3>
              <p className="text-gray-600 text-sm">Full grooms & breed-specific styling</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-[#FCD1E6] rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Deshedding</h3>
              <p className="text-gray-600 text-sm">Deshedding and undercoat removal</p>
              <p className="text-gray-500 text-xs mt-1">*Extra service with additional fee</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-[#FCD1E6] rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🛁</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Premium Baths</h3>
              <p className="text-gray-600 text-sm">Hypoallergenic, oatmeal, and aloe vera baths</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-[#FCD1E6] rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">💅</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Nail Care</h3>
              <p className="text-gray-600 text-sm">Nail trimming and grinding</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-[#FCD1E6] rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🐾</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Detail Work</h3>
              <p className="text-gray-600 text-sm">Sanitary and paw trims</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-[#FCD1E6] rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">👂</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Ear Care</h3>
              <p className="text-gray-600 text-sm">Ear cleaning</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 md:col-span-2 lg:col-span-3"
            >
              <div className="w-12 h-12 bg-[#FCD1E6] rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Spa Upgrades</h3>
              <p className="text-gray-600 text-sm">Specialty spa upgrades (paw balm, deodorizing, etc.)</p>
            </motion.div>
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-center text-gray-600 max-w-3xl mx-auto"
          >
            All grooms are performed by certified, experienced dog groomers who love animals and treat each dog with compassion and patience.
          </motion.p>
        </div>
      </section>

      {/* Spa Policies Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            📋 Spa <span className="text-[#E73992]">Policies</span>
          </h2>
          <div className="bg-[#FFF0F7] rounded-2xl p-8 shadow-lg">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-[#E73992] text-xl">•</span>
                <p className="text-gray-700">All pets must be up to date on vaccinations before their appointment</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#E73992] text-xl">•</span>
                <p className="text-gray-700">Pets with fleas or ticks must receive immediate treatment</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#E73992] text-xl">•</span>
                <p className="text-gray-700">We reserve the right to refuse service to dogs with extreme matting or unsafe behavior</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#E73992] text-xl">•</span>
                <p className="text-gray-700">Grooming refund requests must be submitted within 48 hours of service and are subject to review</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#E73992] to-[#FF69B4] relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-1">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Pamper Your Pet?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Book your pet&apos;s spa day today and see why PinkDog is the preferred choice for pet grooming.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://booking.appointy.com/en-US/pinkdogresort/bookings/service"
              className="inline-flex items-center justify-center bg-white text-[#E73992] hover:bg-gray-100 rounded-full px-8 py-4 text-lg font-semibold transition-colors"
            >
              Book Spa Day
            </Link>
            <Link
              href="/faq"
              className="inline-flex items-center justify-center bg-transparent text-white border-2 border-white hover:bg-white/10 rounded-full px-8 py-4 text-lg font-semibold transition-colors"
            >
              Have Questions?
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
} 