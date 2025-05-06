"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Placeholder images - these will later be replaced by API calls
const instagramImages = [
  {
    id: 1,
    src: "/images/pinkdog-mascots.png",
    alt: "Happy pets at Pink Dog Resort",
    likes: 142,
    comments: 24,
    url: "https://instagram.com/pinkdogresort"
  },
  {
    id: 2,
    src: "/images/pinkdog-flow.png",
    alt: "Pet playing at our facility",
    likes: 98,
    comments: 13,
    url: "https://instagram.com/pinkdogresort"
  },
  {
    id: 3,
    src: "/images/carrosel-1.png",
    alt: "Grooming session at Pink Dog",
    likes: 205,
    comments: 31,
    url: "https://instagram.com/pinkdogresort"
  },
  {
    id: 4,
    src: "/images/carrosel-3.png",
    alt: "Cute puppies at daycare",
    likes: 187,
    comments: 42,
    url: "https://instagram.com/pinkdogresort"
  },
  {
    id: 5,
    src: "/images/pink-dog-resort.png",
    alt: "Our facility",
    likes: 76,
    comments: 8,
    url: "https://instagram.com/pinkdogresort"
  },
  {
    id: 6,
    src: "/images/pingdog-animate.png",
    alt: "Pet playtime",
    likes: 164,
    comments: 27,
    url: "https://instagram.com/pinkdogresort"
  }
];

// Versão simplificada com menos animações
export function InstagramGallery() {
  // Animação simplificada
  const fadeInVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="instagram" className="py-16 md:py-20 bg-gradient-to-b from-white to-[#FDF2F8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInVariants}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            style={{ willChange: "opacity, transform" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Follow Us on <span className="text-[#E73992]">Instagram</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Check out our latest photos and videos of happy pets enjoying their time at Pink Dog Resort.
            </p>
          </motion.div>
          
          {/* Instagram handle */}
          <div className="mt-4 mb-8">
            <Link 
              href="https://instagram.com/pinkdogspa" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-[#E73992] font-medium hover:underline"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
              @pinkdogspa
            </Link>
          </div>
        </div>
        
        {/* Instagram grid - otimizado com menos animações */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-4">
          {instagramImages.map((image, idx) => (
            <div
              key={image.id}
              className="relative group overflow-hidden rounded-xl aspect-square"
            >
              <Link 
                href={image.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-end p-3 sm:p-4">
                  <div className="text-white flex items-center space-x-3">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1">
                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                      </svg>
                      <span className="text-xs">{image.likes}</span>
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1">
                        <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97-1.94.29-3.8.501-5.652.613.76.84 1.41 1.9 1.87 3.03a.75.75 0 01-.697 1.05H12c-.71 0-1.158-.392-1.274-.936-.42-1.976-1.883-2.393-2.977-2.543.708.065 1.433.13 2.142.13a.75.75 0 100-1.5A47.75 47.75 0 017.5 15.764a.75.75 0 00-.75.75v3.986a.75.75 0 001.5 0v-3.003a48.675 48.675 0 013.588-.317 48.507 48.507 0 013.543.318v3.002a.75.75 0 001.5 0v-3.986a.75.75 0 00-.75-.75 47.729 47.729 0 01-4.588-.001c-.78 1.335-1.808 2.293-3.12 2.859a.75.75 0 00-.376.99c.2.341.448.645.743.903a.75.75 0 101.015-1.105 3.131 3.131 0 01-.554-.67 48.894 48.894 0 01-3.06-.286.75.75 0 00-.865.734v4.136a.75.75 0 101.5 0v-3.067l.005-.01c.09-.192.195-.381.317-.561.86-1.26 2.093-1.947 3.489-1.979 1.576-.036 2.99.37 3.373 1.74.08.291.14.545.191.763l.013.058a.75.75 0 101.469-.3 3.73 3.73 0 00-.178-.761c-.27-.91-.9-1.937-2.18-2.397 1.656-.138 3.292-.318 4.892-.582A4.868 4.868 0 0022 12.759V6.741c0-2.658-2.046-4.791-4.587-5.165A50.551 50.551 0 0012 1.25c-2.378 0-4.717.17-6.994.51C2.435 2.144.418 4.304.47 6.929a49.139 49.139 0 00.6 5.904 2.99 2.99 0 00-.296-.72 3.013 3.013 0 00-.475-.704.75.75 0 00-1.149.967c.193.23.374.483.535.757l.015.026c.17.29.32.595.444.913a.75.75 0 001.423-.488 3.826 3.826 0 00-.159-.339A49.392 49.392 0 014.848 2.771z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs">{image.comments}</span>
                    </div>
                  </div>
                </div>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </Link>
            </div>
          ))}
        </div>
        
        {/* View more button */}
        <div className="text-center mt-8">
          <Link 
            href="https://instagram.com/pinkdogresort" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-white text-[#E73992] border border-[#E73992] hover:bg-[#FCD1E6] px-6 py-2.5 rounded-full font-medium transition-colors"
          >
            View More on Instagram
          </Link>
        </div>
      </div>
    </section>
  );
} 