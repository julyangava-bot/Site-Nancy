"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useStoriesVideos } from '@/hooks/useStoriesVideos';

// Gallery images - updated with actual file names from public/images/gallery/all
const galleryImages = [
  // General images (will appear in All Photos)
  {
    id: 1,
    src: "/images/gallery/all/image-1.JPG",
    alt: "Happy dog enjoying our facility",
    caption: "Happy dog enjoying our facility",
    category: "general"
  },
  {
    id: 2,
    src: "/images/gallery/all/image-2.jpg",
    alt: "Dogs playing together",
    caption: "Dogs enjoying playtime together",
    category: "general"
  },
  {
    id: 3,
    src: "/images/gallery/all/image-3.JPG",
    alt: "Cute dog portrait",
    caption: "One of our adorable guests",
    category: "general"
  },
  {
    id: 4,
    src: "/images/gallery/all/image-4.JPG",
    alt: "Dog enjoying playtime",
    caption: "Playtime at PinkDog",
    category: "general"
  },
  {
    id: 5,
    src: "/images/gallery/all/image-5.JPG",
    alt: "Dog with stylish bandana",
    caption: "Stylish pup with our branded bandana",
    category: "general"
  },
  {
    id: 6,
    src: "/images/gallery/all/image-6.JPG",
    alt: "Dog after grooming",
    caption: "Fresh and clean after grooming",
    category: "general"
  },
  
  // Service images
  {
    id: 7,
    src: "/images/gallery/all/image-17.JPG",
    alt: "Dog grooming service",
    caption: "Professional grooming service",
    category: "services"
  },
  {
    id: 8,
    src: "/images/gallery/all/image-20.JPG",
    alt: "Professional grooming",
    caption: "Our expert groomers provide personalized attention",
    category: "services"
  },
  {
    id: 9,
    src: "/images/gallery/all/image-21.JPG",
    alt: "Professional grooming",
    caption: "Grooming with care and attention",
    category: "services"
  },
  {
    id: 10,
    src: "/images/gallery/all/image-13.JPG",
    alt: "Dog grooming session",
    caption: "Gentle grooming for your pet",
    category: "services"
  },
  {
    id: 11,
    src: "/images/gallery/all/image-22.JPG",
    alt: "Dog grooming detail",
    caption: "Attention to every detail",
    category: "services"
  },
  
  // Happy Pets images
  {
    id: 12,
    src: "/images/gallery/all/image-7.jpg",
    alt: "Happy dogs playing",
    caption: "Happy pups enjoying outdoor time",
    category: "pets"
  },
  {
    id: 13,
    src: "/images/gallery/all/image-8.JPG",
    alt: "Dog outdoor portrait",
    caption: "Beautiful portrait of our guest",
    category: "pets"
  },
  {
    id: 14,
    src: "/images/gallery/all/image-9.jpg",
    alt: "Dog playtime",
    caption: "Fun and exercise at PinkDog",
    category: "pets"
  },
  {
    id: 15,
    src: "/images/gallery/all/image-10.JPG",
    alt: "Happy dog smiling",
    caption: "The smile says it all!",
    category: "pets"
  },
  {
    id: 16,
    src: "/images/gallery/all/image-11.JPG",
    alt: "Dog enjoying outdoors",
    caption: "Outdoor adventure time",
    category: "pets"
  },
  {
    id: 17,
    src: "/images/gallery/all/image-12.JPG",
    alt: "Happy dog guest",
    caption: "Another happy guest at PinkDog",
    category: "pets"
  },
  {
    id: 18,
    src: "/images/gallery/all/image-14.JPG",
    alt: "Dog with toy",
    caption: "Playtime with favorite toys",
    category: "pets"
  },
  {
    id: 19,
    src: "/images/gallery/all/image-15.JPG",
    alt: "Dog portrait",
    caption: "Professional pet portrait",
    category: "pets"
  },
  {
    id: 20,
    src: "/images/gallery/all/image-16.JPG",
    alt: "Dog enjoying resort",
    caption: "Relaxing at our pet resort",
    category: "pets"
  },
  
  // Facility images
  {
    id: 21,
    src: "/images/gallery/all/image-27.jpg",
    alt: "PinkDog Pet Resort Facility",
    caption: "Our spacious facility",
    category: "facility"
  },
  {
    id: 22,
    src: "/images/gallery/all/image-40.jpg",
    alt: "PinkDog Pet Resort Interior",
    caption: "Modern and clean interior",
    category: "facility"
  },
  {
    id: 23,
    src: "/images/gallery/all/image-41.jpg",
    alt: "PinkDog Pet Resort Entrance",
    caption: "Welcome to PinkDog Pet Resort",
    category: "facility"
  },
  {
    id: 24,
    src: "/images/gallery/all/image-43.PNG",
    alt: "PinkDog Pet Resort Play Area",
    caption: "Dedicated play area for pets",
    category: "facility"
  },
  {
    id: 25,
    src: "/images/gallery/all/image-28.jpg",
    alt: "PinkDog Pet Resort Garden",
    caption: "Beautiful outdoor space",
    category: "facility"
  },
  {
    id: 26,
    src: "/images/gallery/all/image-29.jpg",
    alt: "PinkDog Pet Resort Reception",
    caption: "Our welcoming reception area",
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
  const [isMounted, setIsMounted] = useState(false);

  // Function to get random items from array
  const getRandomItems = (array: typeof galleryImages, count: number) => {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // First mount flag to prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Update random photos every 10 seconds
  useEffect(() => {
    // Only run this effect on the client after component has mounted
    if (!isMounted) return;

    // Initial selection - ensure we have general images and others for diversity
    const generalImages = galleryImages.filter(img => img.category === "general");
    const otherImages = galleryImages.filter(img => img.category !== "videos" && img.category !== "general");
    
    // Function to combine images to ensure we always have photos to display
    const updateRandomPhotos = () => {
      // Always use exactly 6 images for All Photos
      const targetCount = 6;
      
      // Get all available images except videos
      const allAvailableImages = galleryImages.filter(img => img.category !== "videos");
      
      // If we have fewer than 6 general images, supplement with others
      const generalToUse = getRandomItems(generalImages, Math.min(generalImages.length, 4));
      const othersNeeded = targetCount - generalToUse.length;
      const othersToUse = getRandomItems(otherImages, othersNeeded);
      
      // Combine general and other images
      let newRandomPhotos = [...generalToUse, ...othersToUse];
      
      // Final safeguard: if we still don't have enough, get random from all
      if (newRandomPhotos.length < targetCount) {
        const missingCount = targetCount - newRandomPhotos.length;
        const extraImages = getRandomItems(
          allAvailableImages.filter(img => !newRandomPhotos.some(p => p.id === img.id)), 
          missingCount
        );
        newRandomPhotos = [...newRandomPhotos, ...extraImages];
      }
      
      // Shuffle for visual variety
      setRandomAllPhotos(newRandomPhotos.sort(() => 0.5 - Math.random()));
    };
    
    // Initialize
    updateRandomPhotos();
    
    // Set interval to update random photos every 10 seconds
    const interval = setInterval(updateRandomPhotos, 10000);
    
    return () => clearInterval(interval);
  }, [isMounted]);

  // Ensure we ALWAYS have exactly 6 images for All Photos
  const getAllPhotosImages = () => {
    // During initial server render or before client mount, use a deterministic subset
    // This prevents hydration mismatch errors
    if (!isMounted) {
      // Use first 6 images from general and other categories in a deterministic order
      return galleryImages
        .filter(img => img.category !== "videos")
        .slice(0, 6);
    }
    
    // After client-side mount, use random photos as before
    if (randomAllPhotos.length === 6) {
      return randomAllPhotos;
    }
    
    // Fallback to deterministic subset if randomAllPhotos isn't populated yet
    return galleryImages
      .filter(img => img.category !== "videos")
      .slice(0, 6);
  };
  
  // Filter based on selected category
  const filteredImages = selectedCategory === "all" 
    ? getAllPhotosImages()
    : galleryImages.filter(image => image.category === selectedCategory);
  
  // For non-All Photos categories, use all available images in that category
  const displayedImages = filteredImages;
  
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
          // Photos - Enhanced Masonry Layout with better spacing
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
            {displayedImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }} // Faster delay for smoother appearance
                viewport={{ once: true }}
                className="relative break-inside-avoid mb-4 overflow-hidden rounded-xl shadow-md cursor-pointer group"
                onClick={() => setSelectedImage(image.id)}
              >
                <div className="relative w-full">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={500}
                    height={500}
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    className="w-full object-cover rounded-xl"
                    style={{ aspectRatio: 'auto' }}
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjJkN2U1Ii8+PC9zdmc+"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#E73992]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <p className="text-white font-medium">{image.caption}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          // Videos Grid - also converted to Masonry Layout
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
            {videosLoading ? (
              // Video loading state - matches the masonry layout
              Array.from({ length: 6 }).map((_, index) => (
                <motion.div
                  key={`loading-${index}`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative break-inside-avoid mb-4 overflow-hidden rounded-xl shadow-md bg-gray-100 animate-pulse"
                  style={{ height: '250px' }}
                >
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
              // Video cards in masonry layout
              videos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative break-inside-avoid mb-4 overflow-hidden rounded-xl shadow-md cursor-pointer group"
                  onClick={() => handleVideoClick(video.id)}
                >
                  <div className="relative w-full aspect-video">
                    <iframe
                      className="w-full h-full rounded-xl"
                      src={video.embedUrl}
                      title={video.name}
                      allow="autoplay"
                      allowFullScreen
                    ></iframe>
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
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl w-full max-h-[90vh]" onClick={e => e.stopPropagation()}>
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-pink-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="bg-transparent rounded-xl overflow-hidden">
                <div className="relative w-full max-h-[80vh] flex items-center justify-center">
                  {galleryImages.find(img => img.id === selectedImage) && (
                    <Image
                      src={galleryImages.find(img => img.id === selectedImage)!.src}
                      alt={galleryImages.find(img => img.id === selectedImage)!.alt}
                      width={1200}
                      height={800}
                      className="object-contain max-h-[80vh] rounded-xl"
                      placeholder="blur"
                      blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjJkN2U1Ii8+PC9zdmc+"
                    />
                  )}
                </div>
                <div className="p-4 text-center">
                  <p className="text-white font-medium">
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