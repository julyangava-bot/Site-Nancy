"use client";

import React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, Shield, Users, Award, Sparkles, Brain } from "lucide-react";

export default function PhilosophyPage() {
  // Features for the Philosophy page
  const philosophyValues = [
    {
      icon: <Heart className="w-7 h-7" />,
      title: "Personalized Care",
      description: "Every pet receives individualized attention based on their unique personality and needs."
    },
    {
      icon: <Shield className="w-7 h-7" />,
      title: "Science-Backed Methods",
      description: "23+ years of experience combined with biological sciences and veterinary training."
    },
    {
      icon: <Sparkles className="w-7 h-7" />,
      title: "Crate-Free Approach",
      description: "Daycare-style grooming that reduces anxiety and builds positive associations."
    },
    {
      icon: <Users className="w-7 h-7" />,
      title: "Community Focused",
      description: "Latin women-led business supporting local pet community and rescue organizations."
    },
    {
      icon: <Award className="w-7 h-7" />,
      title: "Trusted Excellence",
      description: "Accredited Better Business Bureau member with growing reputation across states."
    },
    {
      icon: <Brain className="w-7 h-7" />,
      title: "Behavioral Understanding",
      description: "Low-stress handling based on behavioral science and emotional wellness."
    }
  ];

  return (
    <main className="bg-white" id="philosophy">
      {/* Hero Section */}
      <section className="relative pt-36 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF0F7] to-white"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Our Philosophy & <br/> <span className="text-[#E73992]">Core Values</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Where care meets compassion, and every pet is treated as family
              </p>
              <div className="flex gap-4">
                <Button
                  className="bg-[#E73992] text-white hover:bg-[#d3337f] rounded-full px-8 py-6 text-lg"
                  asChild
                >
                  <Link href="https://booking.appointy.com/en-US/pinkdogresort/bookings/service" target="_blank" rel="noopener noreferrer">Book Now</Link>
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full px-8 py-6 text-lg border-[#E73992] text-[#E73992] hover:bg-[#FFF0F7]"
                  asChild
                >
                  <Link href="/faq">Have Questions?</Link>
                </Button>
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
                  src="/images/founders/founders003.jpg"
                  alt="PinkDog Pet Resort Harvard Store Front"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#FCD1E6] rounded-full opacity-50 blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#FFEBF5] rounded-full opacity-50 blur-xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-gradient-to-b from-white to-[#FFF9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-[#E73992]">Core Values</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Every decision we make is guided by our commitment to exceptional, personalized pet care
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {philosophyValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-14 h-14 bg-[#FCD1E6] rounded-xl flex items-center justify-center mb-4 text-[#E73992]">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Personalized Care Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="text-4xl mb-6">🐾</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Personalized Care, <span className="text-[#E73992]">Every Step of the Way</span>
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              At PinkDog Pet Resort, we treat every pet as a unique individual—with care tailored to their personality, energy, and needs. From playful pups to senior companions, each guest enjoys gentle, thoughtful attention in a calm and loving environment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Care Meets Compassion Section */}
      <section className="py-20 bg-[#FDF2F8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Where Care Meets <span className="text-[#E73992]">Compassion</span>
              </h2>
                                 <p className="text-gray-700 leading-relaxed mb-6">
                 At PinkDog Pet Resort, we believe pet care should go far beyond basic services—it should be intentional, informed, and infused with love. That&apos;s why our entire philosophy centers around treating each animal as a unique individual, not just another client.
               </p>
              <p className="text-gray-700 leading-relaxed">
                From a high-energy puppy to a senior pet in need of extra tenderness, every guest receives personalized care tailored to their temperament, health needs, energy level, and emotional comfort.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/gallery/all/image-26.jpg"
                  alt="Happy pets receiving personalized care"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Different Kind of Experience Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              A Different Kind of <span className="text-[#E73992]">Pet Experience</span>
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-6 text-gray-700 leading-relaxed"
          >
                             <p>
               PinkDog Pet Resort is not your typical pet care facility. Our founders, Carina Ramos and Nancy Wyrebski, built PinkDog with a mission: to transform the grooming and boarding experience into something pets look forward to. This vision began in a small 750-square-foot space in 2016 and has grown into a respected, multi-location operation with an unwavering commitment to animal well-being.
             </p>
             <p>
               One of the ways we stand out is our crate-free grooming model—a daycare-style approach where pets can play and socialize before their appointment, reducing anxiety and building positive associations. We avoid crating unless absolutely necessary and always put a pet&apos;s emotional wellness first.
             </p>
          </motion.div>
        </div>
      </section>

      {/* Science-Backed Care Section */}
      <section className="py-20 bg-gradient-to-b from-[#FFF9FC] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/gallery/all/image-9.JPG"
                  alt="Professional grooming with scientific approach"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Science-Backed, <span className="text-[#E73992]">Heart-Led Care</span>
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                With over 23 years of hands-on experience and a background in biological sciences and veterinary training, our leadership brings a rare blend of scientific understanding and compassionate practice.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Every protocol, from grooming techniques to hygiene standards and enrichment routines, is rooted in safety, behavioral science, and love.
              </p>
                                 <p className="text-gray-700 leading-relaxed">
                 We emphasize low-stress handling, transparent communication with pet owners, and consistent observation of each animal&apos;s comfort and behavior. Your pet is not just in expert hands—they&apos;re in caring ones, too.
               </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Play, Learn, and Thrive Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              A Place to Play, Learn, and <span className="text-[#E73992]">Thrive</span>
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-gray-700 leading-relaxed text-lg"
          >
            <p>
              Our indoor and outdoor facilities are fully climate-controlled and designed with both safety and stimulation in mind. Dogs and cats alike enjoy custom play areas, private cat suites, and secure outdoor space where they can move, explore, and socialize. Whether it&apos;s a short grooming visit, a fun daycare session, or an extended hotel stay, pets in our care benefit from enrichment, structured routines, and genuine attention.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Community-Focused Section */}
      <section className="py-20 bg-[#FDF2F8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Community-Focused, <span className="text-[#E73992]">Pet-Centered</span>
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-gray-700 leading-relaxed text-lg"
          >
            <p>
              We are proud to be a Latin women-led business that actively supports our local pet community. From grooming rescue animals to working with local shelters and animal control, we strive to make a broader impact—because our mission isn&apos;t just about pets who walk through our doors, but also those who haven&apos;t yet found their forever home.
            </p>
            <p className="mt-6">
              As a long-standing Accredited Member of the Better Business Bureau, and with a growing reputation in both Massachusetts and Florida, PinkDog stands as a trusted partner to pet parents who want the very best.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why PinkDog Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Why <span className="text-[#E73992]">PinkDog Pet Resort</span>?
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed font-medium">
              Because we see your pet as more than a client—we see them as family. And we care for them that way, every single day.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
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
              Experience the PinkDog Difference
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join our family of happy pets and satisfied pet parents. Your furry friend deserves the best care possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-[#E73992] hover:bg-gray-100 rounded-full px-8 py-6 text-lg font-semibold"
                asChild
              >
                <Link href="https://booking.appointy.com/en-US/pinkdogresort/bookings/service" target="_blank" rel="noopener noreferrer">Book Now</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white/10 rounded-full px-8 py-6 text-lg font-semibold"
                asChild
              >
                <Link href="/faq">Have Questions?</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 