"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, Heart, Shield, Clock, Award, Users, Sparkles } from "lucide-react";
import { useServiceDialog } from "@/context/service-dialog-context";

export default function AboutPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);
  const { openServiceDialog } = useServiceDialog();

  // Founders images data
  const foundersImages = [
    {
      id: 1,
      src: "/images/founders/founders001.jpg",
      alt: "PinkDog Pet Resort Founder",
      caption: "Our dedicated team"
    },
    {
      id: 2,
      src: "/images/founders/founders002.jpg",
      alt: "PinkDog Pet Resort Founder",
      caption: "Caring for pets with love"
    },
    {
      id: 3,
      src: "/images/founders/founders003.jpg",
      alt: "PinkDog Pet Resort Founder",
      caption: "Professional pet care experts"
    },
    {
      id: 4,
      src: "/images/founders/founders004.jpg",
      alt: "PinkDog Pet Resort Founder",
      caption: "Building relationships with pets and families"
    }
  ];

  // Features for the About page
  const features = [
    {
      icon: <Heart className="w-7 h-7" />,
      title: "23+ Years Experience",
      description: "Decades of professional expertise in animal care, biology, and veterinary science."
    },
    {
      icon: <Shield className="w-7 h-7" />,
      title: "Safe & Secure",
      description: "24/7 supervision with trained professionals in a secure, monitored facility."
    },
    {
      icon: <Sparkles className="w-7 h-7" />,
      title: "Premium Facilities",
      description: "Climate-controlled indoor and outdoor areas for year-round comfort."
    },
    {
      icon: <Users className="w-7 h-7" />,
      title: "Community Focused",
      description: "Latin woman-owned business giving back to our local pet community."
    },
    {
      icon: <Award className="w-7 h-7" />,
      title: "Certified Team",
      description: "All staff trained in pet first aid and behavior management."
    },
    {
      icon: <Clock className="w-7 h-7" />,
      title: "Flexible Hours",
      description: "Extended hours and weekend availability for your convenience."
    }
  ];

  // Handle ESC key press to close modal
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setSelectedImage(null);
    }
  }, []);

  // Set client-side flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Control body scroll when modal is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImage, handleKeyDown]);

  return (
    <>
      <main className="bg-white">
        {/* Hero Section - Following service page layout pattern */}
        <section className="relative pt-38 pb-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#FFF0F7] to-white"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-1">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Welcome to <br/> <span className="text-[#E73992]">PinkDog Pet Resort</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Exceptional Pet Care in a Space Built for Comfort, Play, and Peace of Mind
                </p>
                <div className="flex gap-4">
                  <Button
                    className="bg-[#E73992] text-white hover:bg-[#d3337f] rounded-full px-8 py-6 text-lg"
                    onClick={openServiceDialog}
                  >
                    Book Now
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full px-8 py-6 text-lg border-[#E73992] text-[#E73992] hover:bg-[#FFF0F7]"
                    asChild
                  >
                    <Link href="/faq">Have Question?</Link>
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
                    src="/images/founders/founders004.jpg"
                    alt="PinkDog Pet Resort Harvard Store Front"
                    fill
                    className="object-cover object-right"
                    style={{ objectPosition: 'calc(100% + 70px) center' }}
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

          {/* Features Section - Similar to service pages */}
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
                  Why Choose <span className="text-[#E73992]">PinkDog Pet Resort</span>?
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  With over 23 years of experience, we&apos;ve built more than a pet care facility—we&apos;ve created a home away from home
                </p>
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

          {/* Our Philosophy Section - with institutional text */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    A Haven Built with <span className="text-[#E73992]">Heart</span>
                  </h2>
                  <div className="space-y-4 text-gray-600">
                    <p className="leading-relaxed">
                      At PinkDog Pet Resort, we&apos;ve created more than a place for pet care—we&apos;ve built a haven where dogs and cats can feel truly at home. From grooming and daycare to overnight stays, our services are rooted in love, compassion, and over 23 years of professional experience.
                    </p>
                    <p className="leading-relaxed">
                      We&apos;ve thoughtfully designed our facility with climate-controlled indoor and outdoor areas, giving pets space to play, rest, and explore in comfort no matter the season. For our feline guests, we offer private luxury cat suites and a dedicated cat play area, providing a calm, enriching experience tailored to their unique needs.
                    </p>
                    <p className="leading-relaxed">
                      Every pet is different, and we believe their care should reflect that. Our team provides individualized attention for each guest based on personality, comfort level, and special requirements.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src="/images/pinkdog-happy-pets.jpg"
                      alt="Happy pets at PinkDog"
                      fill
                      className="object-cover"
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

          {/* Community Section */}
          <section className="py-20">
            <div className="max-w-4xl mx-auto px-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center"
              >
                More Than a Pet Resort—A Community
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-gray-700 leading-relaxed text-lg"
              >
                             We&apos;re proud to be a Latin woman-owned business, committed to giving back to our local pet community. We partner with animal welfare organizations, participate in adoption events, and provide grooming and care to animals in need. Our goal is to not only support the pets we care for, but to help build a stronger, more compassionate pet-loving community.
              </motion.p>
            </div>
          </section>

          {/* What's Included Section - Better design with icons */}
          <section className="py-20 bg-[#FDF2F8]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="order-2 lg:order-1"
                >
                  <div className="relative group">
                    {/* Pink gradient background card */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FCD1E6] to-[#FFE4F1] rounded-3xl transform rotate-3 scale-105"></div>
                    
                    {/* Main image container */}
                    <div className="relative bg-white p-2 rounded-3xl shadow-xl transform transition-transform hover:-rotate-1">
                      <div className="relative h-[480px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#FFF9FC] to-white">
                        <Image
                          src="/images/gallery/facility/image-41.jpg"
                          alt="PinkDog Pet Resort Facility"
                          fill
                          className="object-contain p-4"
                        />
                      </div>
                      
                      {/* Caption */}
                      <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                        <p className="text-sm font-semibold text-[#E73992]">Our Harvard Location</p>
                        <p className="text-xs text-gray-600">Where every pet is treated like family</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="order-1 lg:order-2"
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                    Designed With <span className="text-[#E73992]">You In Mind</span>
                  </h2>
                  <div className="space-y-4">
                    {[
                      "Climate-controlled indoor and outdoor play yards",
                      "Spacious luxury suites for dogs and cats",
                      "Private cat playroom",
                      "Professional dog grooming services",
                      "Easy on-site parking for quick drop-off and pick-up",
                      "Safe, secure, and supervised facility"
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-6 h-6 bg-[#E73992] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                        <p className="text-gray-700">{item}</p>
                      </motion.div>
                    ))}
                  </div>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="mt-6 text-gray-600 leading-relaxed"
                  >
                    At PinkDog Pet Resort, we&apos;re more than a business—we&apos;re a space created with heart. A place where pets thrive, and their humans can feel confident knowing their companions are loved, understood, and well cared for.
                  </motion.p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Meet the Founders Section - With clickable images */}
          <section className="py-20 bg-gradient-to-b from-white to-[#FFF9FC]">
            <div className="max-w-6xl mx-auto px-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center"
              >
                Meet the <span className="text-[#E73992]">Founders</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-gray-600 text-lg text-center mb-16 max-w-3xl mx-auto"
              >
                Carina Ramos and Nancy Wyrebski, co-founders of PinkDog Pet Resort, bring decades of expertise and a shared passion for animal well-being. Together, they&apos;ve created a space where pets thrive and families feel at peace.
              </motion.p>
              
              {/* Founders Introduction Video - with enhanced design */}
              <div className="relative mb-20">
                {/* Decorative background shape */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full max-w-5xl h-[400px] bg-[#FCD1E6] opacity-20 rounded-3xl blur-3xl"></div>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="relative rounded-3xl overflow-hidden shadow-2xl mx-auto max-w-4xl bg-[#E73992] p-[3px]"
                >
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black">
                    <iframe
                      src="https://www.youtube.com/embed/sXMOyctffRw?autoplay=0&mute=0&loop=0&controls=1&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3"
                      title="Meet Nancy and Karina - PinkDog Pet Resort Founders"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      className="w-full h-full absolute inset-0"
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </div>
                </motion.div>
              </div>

              {/* Visual separator */}
              <div className="flex items-center justify-center mb-12">
                <div className="h-px bg-gradient-to-r from-transparent via-[#E73992]/30 to-transparent w-full max-w-md"></div>
              </div>

              {/* Gallery subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-center text-gray-600 mb-8"
              >
                Follow Carina and Nancy&apos;s journey from the early days to building the PinkDog family we know today
              </motion.p>
              
              {/* Founders Images Grid - Clickable */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {foundersImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative h-80 rounded-2xl overflow-hidden shadow-lg cursor-pointer group"
                    onClick={() => setSelectedImage(image.id)}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <p className="text-white font-medium">{image.caption}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section - Following service page layout pattern */}
          <section className="py-20 bg-gradient-to-r from-[#E73992] to-[#FF69B4] relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to Give Your Pet the Best Care?
                </h2>
                <p className="text-xl text-white/90 mb-8">
                  Book your pet&apos;s stay today and experience the PinkDog difference. 
                  Our team is ready to welcome your furry family member!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-white text-[#E73992] hover:bg-gray-100 rounded-full px-8 py-6 text-lg font-semibold"
                    onClick={openServiceDialog}
                  >
                    Book Now
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
        
        {/* Photo Lightbox Modal - Mobile Friendly */}
        {isClient && (
          <AnimatePresence>
            {selectedImage && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                onClick={() => setSelectedImage(null)}
              >
                {/* Semi-transparent overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-90" />
                
                {/* Image Container */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="relative max-w-4xl w-full max-h-[90vh] z-1"
                  onClick={e => e.stopPropagation()}
                >
                  {/* Close button */}
                  <button 
                    onClick={() => setSelectedImage(null)}
                    className="absolute -top-12 right-0 text-white hover:text-pink-300 transition-colors z-20 p-2"
                    aria-label="Close image"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  
                  {/* Image */}
                  <div className="bg-transparent rounded-xl overflow-hidden">
                    <div className="relative w-full max-h-[80vh] flex items-center justify-center">
                      {foundersImages.find(img => img.id === selectedImage) && (
                        <Image
                          src={foundersImages.find(img => img.id === selectedImage)!.src}
                          alt={foundersImages.find(img => img.id === selectedImage)!.alt}
                          width={1200}
                          height={800}
                          className="object-contain max-h-[80vh] rounded-xl"
                          placeholder="blur"
                          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjJkN2U1Ii8+PC9zdmc+"
                        />
                      )}
                    </div>
                    <div className="p-4 text-center">
                      <p className="text-white font-medium text-lg">
                        {foundersImages.find(img => img.id === selectedImage)?.caption}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </>
    );
  }
