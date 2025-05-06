"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Gallery images - in a real project, you would replace these with actual pet images
const galleryImages = [
  {
    id: 1,
    src: "/images/pinkdog-mascots.png",
    alt: "Happy dog at Pink Dog Resort",
    caption: "Our furry friends enjoy playtime"
  },
  {
    id: 2,
    src: "/images/pink-dog-resort.png",
    alt: "Pink Dog Resort facility",
    caption: "Our modern facility"
  },
  {
    id: 3,
    src: "/images/carrosel-1.png",
    alt: "Grooming session",
    caption: "Professional grooming services"
  },
  {
    id: 4,
    src: "/images/pinkdog-flow.png",
    alt: "Dogs playing in daycare",
    caption: "Socialization and fun activities"
  },
  {
    id: 5,
    src: "/images/PinkDogSpaLogo.png",
    alt: "Pink Dog Spa Logo",
    caption: "Our brand represents quality care"
  },
  {
    id: 6,
    src: "/images/pingdog-animate.png",
    alt: "Pet boarding area",
    caption: "Comfortable boarding accommodations"
  }
];

// Filter categories
const categories = [
  { id: "all", name: "All Photos" },
  { id: "facility", name: "Our Facility" },
  { id: "pets", name: "Happy Pets" },
  { id: "services", name: "Services" }
];

export function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Filter would be implemented based on actual image categorization
  const filteredImages = galleryImages;

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-[#E73992]">Gallery</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Take a peek at our facilities and the happy pets we care for
          </p>
        </motion.div>
        
        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-10"
        >
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? "bg-[#E73992] text-white"
                  : "bg-[#FCD1E6] bg-opacity-40 text-gray-700 hover:bg-opacity-60"
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>
        
        {/* Gallery grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-xl shadow-md cursor-pointer group"
              onClick={() => setSelectedImage(image.id)}
            >
              <div className="relative w-full h-64">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <p className="text-white font-medium">{image.caption}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Lightbox modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-pink-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="bg-white rounded-xl overflow-hidden">
                <div className="relative aspect-video w-full h-[400px]">
                  {galleryImages.find(img => img.id === selectedImage) && (
                    <Image
                      src={galleryImages.find(img => img.id === selectedImage)!.src}
                      alt={galleryImages.find(img => img.id === selectedImage)!.alt}
                      fill
                      className="object-contain"
                    />
                  )}
                </div>
                <div className="p-4 text-center">
                  <p className="text-gray-800 font-medium">
                    {galleryImages.find(img => img.id === selectedImage)?.caption}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 italic">
            We take pride in providing a clean, safe, and fun environment for all our furry guests!
          </p>
        </motion.div>
      </div>
    </section>
  );
} 