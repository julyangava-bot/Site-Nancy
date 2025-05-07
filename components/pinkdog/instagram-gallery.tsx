"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useInstagramFeed } from "@/hooks/useInstagramFeed";
import { IconBrandInstagram, IconBrandFacebook } from "@tabler/icons-react";

// Fallback images in case API fails
const fallbackImages = [
  {
    id: "1",
    src: "/images/pinkdog-mascots.png",
    alt: "Happy pets at Pink Dog Resort",
    url: "https://instagram.com/pinkdogspa"
  },
  // ... other fallback images can remain from the original component
];

export function InstagramGallery() {
  const instagramToken = process.env.NEXT_PUBLIC_IG_TOKEN || '';
  const { posts, loading, error } = useInstagramFeed(instagramToken);
  
  // Decide which images to show - use Instagram posts or fallbacks
  const displayImages = posts.length > 0 
    ? posts.slice(0, 6).map(post => ({
        id: post.id,
        src: post.media_url,
        alt: post.caption || "Pink Dog Resort Instagram post",
        url: post.permalink
      }))
    : fallbackImages;

  // Animation variants
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
              Followers on <span className="text-[#E73992]">Instagram</span>
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
        
        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E73992]"></div>
          </div>
        )}
        
        {/* Error state */}
        {error && !loading && (
          <div className="text-center text-gray-500 py-8">
            <p>Could not load Instagram posts. Please check back later.</p>
          </div>
        )}
        
        {/* Instagram grid */}
        {!loading && !error && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-4">
            {displayImages.map((image) => (
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
                    <span className="text-white text-xs line-clamp-2">
                      {image.alt}
                    </span>
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
        )}
        
        {/* Follow us button */}
        <div className="text-center mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            href="https://instagram.com/pinkdogspa" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-white text-[#E73992] border border-[#E73992] hover:bg-[#FCD1E6] px-6 py-2.5 rounded-full font-medium transition-colors"
          >
            <IconBrandInstagram size={20} className="mr-2" />
            Follow on Instagram
          </Link>
          <Link 
            href="https://facebook.com/pinkdogresort" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-white text-[#3b5998] border border-[#3b5998] hover:bg-[#edf0f7] px-6 py-2.5 rounded-full font-medium transition-colors"
          >
            <IconBrandFacebook size={20} className="mr-2" />
            Follow on Facebook
          </Link>
        </div>
      </div>
    </section>
  );
} 