"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Pink wave background */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-[#FCD1E6] rounded-t-[50%] transform translate-y-16"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo section */}
        <div className="pt-6 pb-4">
          <Image 
            src="/images/PinkDogSpaLogo.png" 
            alt="Pink Dog Logo" 
            width={180} 
            height={60}
            className="h-auto w-auto"
          />
        </div>

        {/* Hero content */}
        <div className="relative pt-8 pb-20 sm:pt-12 md:pt-16 lg:pt-20 lg:pb-28">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            {/* Text content */}
            <div className="max-w-2xl text-center lg:text-left z-10">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 font-display"
              >
                Welcome to <span className="text-[#E73992]">Pink Dog</span>
                <span className="block mt-2">Your Pet&apos;s Favorite Place!</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl"
              >
                Pet Hotel • Daycare • Grooming – All with ❤️
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
              >
                <Button
                  className="bg-[#E73992] text-white hover:bg-[#d3337f] text-base px-8 py-6 h-auto rounded-full"
                  asChild
                >
                  <Link href="/booking">Book Now</Link>
                </Button>
                <Button
                  className="bg-white text-[#E73992] border-2 border-[#E73992] hover:bg-[#FCD1E6] hover:text-[#E73992] hover:border-[#E73992] text-base px-8 py-6 h-auto rounded-full"
                  asChild
                >
                  <Link href="/services">View Services</Link>
                </Button>
              </motion.div>
            </div>
            
            {/* 3D Mascot image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative z-10 w-full max-w-md lg:max-w-lg xl:max-w-xl"
            >
              <div className="relative">
                <div className="w-full h-full">
                  <Image
                    src="/images/PinkDogSpaLogo.png"
                    alt="Pink Dog Mascots"
                    width={500}
                    height={500}
                    priority
                    className="w-full h-auto object-contain"
                  />
                </div>
                
                {/* Decorative paw prints */}
                <div className="absolute -bottom-4 -left-6 w-10 h-10 opacity-50">
                  <Image
                    src="/images/paw-print.png"
                    alt=""
                    width={40}
                    height={40}
                    className="w-full h-auto"
                  />
                </div>
                <div className="absolute -top-8 -right-4 w-8 h-8 opacity-40">
                  <Image
                    src="/images/paw-print.png"
                    alt=""
                    width={30}
                    height={30}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Background decoration elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#FCD1E6] opacity-20"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#FCD1E6] opacity-20"></div>
      <div className="absolute top-1/2 right-10 transform -translate-y-1/2 w-4 h-4 rounded-full bg-[#E73992] opacity-40"></div>
      <div className="absolute top-1/4 left-10 w-6 h-6 rounded-full bg-[#E73992] opacity-30"></div>
    </div>
  );
}
