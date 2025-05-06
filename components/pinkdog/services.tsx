"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Service card data
const services = [
  {
    id: "pet-hotel",
    title: "Pet Hotel",
    description: "Luxurious accommodations for your pets while you&apos;re away. 24/7 care with comfortable beds and personalized attention.",
    icon: "/images/paw-print.svg",
    image: "/images/pink-dog-resort.png",
    color: "bg-[#FCD1E6]",
    link: "/services/pet-hotel"
  },
  {
    id: "daycare",
    title: "Daycare",
    description: "Supervised play and socialization for your pets. Safe environment with trained professionals and fun activities.",
    icon: "/images/paw-print.svg",
    image: "/images/pinkdog-mascots.png",
    color: "bg-[#FFEBF5]",
    link: "/services/daycare"
  },
  {
    id: "grooming",
    title: "Grooming",
    description: "Professional grooming services to keep your pet looking and feeling their best. Includes bathing, trimming, and styling.",
    icon: "/images/paw-print.svg",
    image: "/images/carrosel-1.png",
    color: "bg-[#FCD1E6]",
    link: "/services/grooming"
  },
  {
    id: "van-service",
    title: "Van Service",
    description: "Convenient pet transport to and from our facility. Comfortable and safe rides for your furry friends.",
    icon: "/images/paw-print.svg",
    image: "/images/pinkdog-flow.png",
    color: "bg-[#FFEBF5]",
    link: "/services/van-service"
  }
];

export function Services() {
  return (
    <section id="services" className="relative py-20 overflow-hidden bg-white">
      {/* Pink wave background at top */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-[#FCD1E6] rounded-b-[50%] transform -translate-y-16"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Our <span className="text-[#E73992]">Services</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Providing exceptional care for your furry family members with our premium services
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative bg-white rounded-2xl shadow-lg overflow-hidden group"
            >
              <div className={`absolute top-0 left-0 w-1/2 h-full ${service.color} opacity-40 rounded-r-full transform -translate-x-1/4 transition-transform group-hover:translate-x-0`}></div>
              
              <div className="flex flex-col md:flex-row items-center p-6 h-full relative">
                <div className="w-full md:w-1/2 mb-6 md:mb-0 md:pr-6">
                  <div className="relative w-20 h-20 mb-4 bg-[#FCD1E6] rounded-xl p-4">
                    <Image
                      src={service.icon}
                      alt={`${service.title} icon`}
                      fill
                      className="p-4 object-contain"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <Button
                    className="bg-[#E73992] text-white hover:bg-[#d3337f] rounded-full"
                    asChild
                  >
                    <Link href={service.link}>Learn More</Link>
                  </Button>
                </div>
                
                <div className="w-full md:w-1/2 relative h-60 md:h-72 rounded-xl overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 