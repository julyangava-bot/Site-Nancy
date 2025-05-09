"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useStoriesVideos } from '@/hooks/useStoriesVideos';

// Gallery images - in a real project, you would replace these with actual pet images
const galleryImages = [
  // General images (will appear in All Photos)
  {
    id: 201,
    src: "/images/gallery/team-with-dogs.jpg",
    alt: "Pink Dog staff with pets",
    caption: "Our team with our furry friends",
    category: "general"
  },
  
  // Service images
  {
    id: 12,
    src: "/images/gallery/services/image-17.JPG",
    alt: "Dog grooming service",
    caption: "Loving care during grooming sessions",
    category: "services"
  },
  {
    id: 13,
    src: "/images/gallery/services/image-20.JPG",
    alt: "Professional grooming",
    caption: "Our expert groomers provide personalized attention",
    category: "services"
  },
  {
    id: 1,
    src: "/images/gallery/services/image-21.JPG",
    alt: "Professional grooming",
    caption: "Our expert groomers provide personalized attention",
    category: "services"
  },
  // Happy Pets images
  {
    id: 14,
    src: "/images/gallery/happy-pets/image-1.JPG",
    alt: "White Samoyed smiling",
    caption: "Happy white Samoyed enjoying our play area",
    category: "pets"
  },
  {
    id: 15,
    src: "/images/gallery/happy-pets/image-2.jpg",
    alt: "Group of dogs playing together",
    caption: "Friendly pack enjoying outdoor playtime",
    category: "pets"
  },
  {
    id: 16,
    src: "/images/gallery/happy-pets/image-4.JPG",
    alt: "Collie closeup",
    caption: "Beautiful collie enjoying personal attention",
    category: "pets"
  },
  {
    id: 17,
    src: "/images/gallery/happy-pets/image-5.JPG",
    alt: "Alaskan Malamute with bandana",
    caption: "Stylish Malamute sporting a pink bandana",
    category: "pets"
  },
  {
    id: 18,
    src: "/images/gallery/happy-pets/image-6.JPG",
    alt: "Goldendoodle relaxing",
    caption: "Relaxed Goldendoodle after grooming session",
    category: "pets"
  },
  {
    id: 19,
    src: "/images/gallery/happy-pets/image-9.jpg",
    alt: "Boston Terrier puppy",
    caption: "Adorable Boston Terrier puppy with toy",
    category: "pets"
  },
  // Facility images
  {
    id: 7,
    src: "/images/gallery/facility/image-27.png",
    alt: "Pink Dog Resort Facility",
    caption: "Our spacious facility",
    category: "facility"
  },
  {
    id: 8,
    src: "/images/gallery/facility/image-40.jpg",
    alt: "Pink Dog Resort Interior",
    caption: "Modern and clean interior",
    category: "facility"
  },
  {
    id: 9,
    src: "/images/gallery/facility/image-41.jpg",
    alt: "Pink Dog Resort Entrance",
    caption: "Welcome to Pink Dog Resort",
    category: "facility"
  },
  {
    id: 10,
    src: "/images/gallery/facility/image-43.jpg",
    alt: "Pink Dog Resort Play Area",
    caption: "Dedicated play area for pets",
    category: "facility"
  }
];

// Filter categories
const categories = [
  { id: "all", name: "All Photos" },
  { id: "facility", name: "Our Facility" },
  { id: "pets", name: "Happy Pets" },
  { id: "services", name: "Services" },
  { id: "videos", name: "Videos" }
];

export function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [randomAllPhotos, setRandomAllPhotos] = useState<typeof galleryImages>([]);
  const { videos, isLoading: videosLoading, error: videosError } = useStoriesVideos();

  // Function to get random items from array
  const getRandomItems = (array: typeof galleryImages, count: number) => {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // Update random photos every 30 seconds
  useEffect(() => {
    // Initial random selection
    const generalImages = galleryImages.filter(img => img.category === "general");
    const otherImages = galleryImages.filter(img => img.category !== "videos" && img.category !== "general");
    
    // Combine general images with some random other images to reach 6 total
    const randomOthers = getRandomItems(otherImages, 6 - generalImages.length);
    setRandomAllPhotos([...generalImages, ...randomOthers]);
    
    // Set interval to update random photos
    const interval = setInterval(() => {
      const newRandomOthers = getRandomItems(otherImages, 6 - generalImages.length);
      setRandomAllPhotos([...generalImages, ...newRandomOthers]);
    }, 30000); // 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  // Filter based on selected category
  const filteredImages = selectedCategory === "all" 
    ? randomAllPhotos 
    : galleryImages.filter(image => image.category === selectedCategory);
  
  const isVideoTab = selectedCategory === "videos";

  // Use a simpler approach for popup
  const [isClient, setIsClient] = useState(false);

  // Handle ESC key press to close modals
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setSelectedVideo(null);
      setSelectedImage(null);
    }
  }, []);

  // Control body scroll when modal is open and set client-side indicator
  useEffect(() => {
    // Mark as client-side rendered
    setIsClient(true);
    
    if (selectedVideo || selectedImage) {
      // Disable scrolling on body
      document.body.style.overflow = 'hidden';
      // Add escape key listener
      window.addEventListener('keydown', handleKeyDown);
    } else {
      // Re-enable scrolling
      document.body.style.overflow = 'auto';
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedVideo, selectedImage, handleKeyDown]);

  // Simplified click handler
  const handleVideoClick = (videoId: string) => {
    setSelectedVideo(videoId);
  };

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
        
        {/* Gallery content - conditionally render photos or videos */}
        {!isVideoTab ? (
          // Photos Grid
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
                    className="object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <p className="text-white font-medium">{image.caption}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          // Videos Grid
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {videosLoading ? (
              // Video loading state - matches the photo grid layout
              Array.from({ length: 6 }).map((_, index) => (
                <motion.div
                  key={`loading-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative overflow-hidden rounded-xl shadow-md bg-gray-100 animate-pulse"
                >
                  <div className="relative w-full h-64"></div>
                </motion.div>
              ))
            ) : videosError ? (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-500">Couldn&apos;t load videos. Please try again later.</p>
              </div>
            ) : videos.length === 0 ? (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-500">No videos available at the moment</p>
              </div>
            ) : (
              // Video cards - update onClick to use simplified handler
              videos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative overflow-hidden rounded-xl shadow-md cursor-pointer group"
                  onClick={() => handleVideoClick(video.id)}
                >
                  <div className="relative w-full h-64">
                    <div className="absolute inset-0 w-full h-full">
                      <iframe
                        className="w-full h-full"
                        src={video.embedUrl}
                        title={video.name}
                        allow="autoplay"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 pointer-events-none">
                      <p className="text-white font-medium truncate">{video.name}</p>
                      <p className="text-white text-sm opacity-80">
                        {new Date(video.createdTime).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}
        
        {/* Photo Lightbox modal */}
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
        
        {/* Video Popup Dialog - simplified */}
        {isClient && (
          <AnimatePresence>
            {selectedVideo && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
                onClick={() => setSelectedVideo(null)}
              >
                {/* Semi-transparent overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50" />
                
                {/* Popup Dialog */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="relative w-full max-w-3xl z-10 bg-white rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]"
                  onClick={e => e.stopPropagation()}
                >
                  {/* Close button */}
                  <button 
                    onClick={() => setSelectedVideo(null)}
                    className="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-sm text-gray-800 hover:text-pink-500 p-2 rounded-full transition-colors duration-200"
                    aria-label="Close modal"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  
                  {/* Video container */}
                  <div className="relative w-full" style={{ paddingBottom: '56.25%' }}> {/* 16:9 aspect ratio */}
                    {videos.find(v => v.id === selectedVideo) && (
                      <iframe
                        src={videos.find(v => v.id === selectedVideo)!.embedUrl}
                        title={videos.find(v => v.id === selectedVideo)!.name}
                        className="absolute top-0 left-0 w-full h-full"
                        allowFullScreen
                        allow="autoplay"
                      ></iframe>
                    )}
                  </div>
                  
                  {/* Video info */}
                  <div className="p-5 bg-white">
                    <h3 className="text-gray-800 font-medium text-lg md:text-xl">
                      {videos.find(v => v.id === selectedVideo)?.name}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">
                      {videos.find(v => v.id === selectedVideo) && 
                       new Date(videos.find(v => v.id === selectedVideo)!.createdTime).toLocaleDateString()}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
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