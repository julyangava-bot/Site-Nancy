"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

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
  // {
  //   id: 11,
  //   src: "/images/gallery/all/image-22.JPG",
  //   alt: "Dog grooming detail",
  //   caption: "Attention to every detail",
  //   category: "services"
  // },
  {
    id: 28,
    src: "/images/gallery/services/image-50.jpg",
    alt: "Professional pet care service",
    caption: "Our expert team providing professional pet care",
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
    src: "/images/gallery/all/image-17.JPG",
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
  },
  {
    id: 27,
    src: "/images/gallery/all/image-20.JPG",
    alt: "PinkDog Pet Resort Reception",
    caption: "Our welcoming reception area",
    category: "facility"
  }
];

// YouTube story videos
const storyVideos = [
  { id: "story01", youtubeId: "b7LtoyqQ0aE", name: "Story 1" },
  { id: "story02", youtubeId: "QbPVFsb5CN0", name: "Story 2" },
  { id: "story03", youtubeId: "81Nkq_yWIr8", name: "Story 3" },
  { id: "story04", youtubeId: "OF7InBTZ7ZY", name: "Story 4" },
  { id: "story05", youtubeId: "LA4NwLOhRzU", name: "Story 5" },
  { id: "story06", youtubeId: "dhXjIlTwmtg", name: "Story 6" },
  { id: "story07", youtubeId: "f2dVmgs5w7Q", name: "Story 7" },
  { id: "story08", youtubeId: "YC8NZ7QPn0w", name: "Story 8" },
  { id: "story09", youtubeId: "woqsN0ZDLY0", name: "Story 9" }
];

// Filter categories
const categories = [
  { id: "all", name: "All Photos" },
  { id: "facility", name: "Our Facility" },
  { id: "pets", name: "Happy Pets" },
  { id: "services", name: "Services" },
  { id: "videos", name: "Videos" }
];

// Type definitions
interface ImageItem {
  id: number;
  src: string;
  alt: string;
  caption: string;
  category: string;
}

interface VideoItem {
  id: string;
  youtubeId: string;
  name: string;
}

type GalleryItem = ImageItem | VideoItem;

// Skeleton loading component
const ImageSkeleton = () => (
  <div className="relative aspect-[3/4] overflow-hidden rounded-xl shadow-md bg-gray-200 animate-pulse">
    <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
  </div>
);

export function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [randomAllPhotos, setRandomAllPhotos] = useState<typeof galleryImages>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [videoStartIndex, setVideoStartIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [photoCount, setPhotoCount] = useState(6);
  const [isLoadingImages, setIsLoadingImages] = useState(true);

  // Check screen size and set photo count
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      
      // Always show 6 photos (3 rows x 2 columns) for smaller screens
      if (width < 1024) {
        setPhotoCount(6);
        setIsMobile(true);
      } else {
        setPhotoCount(8);
        setIsMobile(false);
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

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
      setIsLoadingImages(true);
      
      // Use dynamic photo count based on screen size
      const targetCount = photoCount;
      
      // Get all available images except videos
      const allAvailableImages = galleryImages.filter(img => img.category !== "videos");
      
      // If we have fewer general images, supplement with others
      const generalToUse = getRandomItems(generalImages, Math.min(generalImages.length, Math.floor(targetCount * 0.6)));
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
      setRandomAllPhotos(newRandomPhotos.sort(() => 0.5 - Math.random()).slice(0, targetCount));
      
      // Simulate loading time
      setTimeout(() => setIsLoadingImages(false), 300);
    };
    
    // Initialize
    updateRandomPhotos();
    
    // Set interval to update random photos every 10 seconds
    const interval = setInterval(updateRandomPhotos, 10000);
    
    return () => clearInterval(interval);
  }, [isMounted, photoCount]);

  // Rotate videos every 15 seconds on mobile
  useEffect(() => {
    if (!isMobile || selectedCategory !== "videos") return;
    
    const interval = setInterval(() => {
      setVideoStartIndex((prev) => (prev + 6) % storyVideos.length);
    }, 15000);
    
    return () => clearInterval(interval);
  }, [isMobile, selectedCategory]);

  // Get videos to display based on mobile/desktop
  const getDisplayedVideos = () => {
    if (!isMobile) {
      return storyVideos;
    }
    
    // On mobile, show 6 videos starting from videoStartIndex
    const videos = [];
    for (let i = 0; i < 6; i++) {
      const index = (videoStartIndex + i) % storyVideos.length;
      videos.push(storyVideos[index]);
    }
    return videos;
  };

  // Ensure we ALWAYS have exactly the right amount of images for All Photos
  const getAllPhotosImages = () => {
    // During initial server render or before client mount, use a deterministic subset
    // This prevents hydration mismatch errors
    if (!isMounted) {
      // Use first 6 images from general and other categories in a deterministic order
      return galleryImages
        .filter(img => img.category !== "videos")
        .slice(0, 6);
    }
    
    // After client-side mount, use random photos with the correct count
    if (randomAllPhotos.length === photoCount) {
      return randomAllPhotos;
    }
    
    // Fallback to deterministic subset if randomAllPhotos isn't populated yet
    return galleryImages
      .filter(img => img.category !== "videos")
      .slice(0, photoCount);
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

  // Function to determine if the last row should be centered
  const shouldCenterLastRow = (itemCount: number, itemsPerRow: number) => {
    return itemCount % itemsPerRow !== 0;
  };

  // Function to get grid layout based on screen size
  const getGridLayout = () => {
    if (isVideoTab) {
      return "grid-cols-2 lg:grid-cols-6";
    }
    
    // For photos: always 2 columns on smaller screens, 4 on large screens
    if (selectedCategory === "all") {
      return "grid-cols-2 lg:grid-cols-4";
    }
    
    return "grid-cols-2 lg:grid-cols-4";
  };

  // Function to render items with centered last row if needed
  const renderGridItems = (items: GalleryItem[], isVideo: boolean = false) => {
    const itemsPerRow = isMobile ? 2 : (isVideo ? 6 : 4);
    const shouldCenter = shouldCenterLastRow(items.length, itemsPerRow);
    const lastRowItemCount = items.length % itemsPerRow;
    const lastRowStartIndex = items.length - lastRowItemCount;

    return (
      <>
        {/* Regular grid for complete rows */}
        <div className={`grid gap-4 ${getGridLayout()}`}>
          {items.slice(0, shouldCenter ? lastRowStartIndex : items.length).map((item) => (
            <div
              key={item.id}
              className="relative aspect-[3/4] overflow-hidden rounded-xl shadow-md cursor-pointer group"
              onClick={() => {
                if (isVideo) {
                  setSelectedVideo(item.id as string);
                } else {
                  setSelectedImage(item.id as number);
                }
              }}
            >
              {selectedCategory === "all" && isLoadingImages ? (
                <ImageSkeleton />
              ) : isVideo ? (
                <>
                  {/* YouTube iframe thumbnail */}
                  <div className="absolute inset-0 w-full h-full">
                    <Image
                      src={`https://img.youtube.com/vi/${(item as VideoItem).youtubeId}/maxresdefault.jpg`}
                      alt={(item as VideoItem).name}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        e.currentTarget.src = `https://img.youtube.com/vi/${(item as VideoItem).youtubeId}/0.jpg`;
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-white text-sm font-medium">{(item as VideoItem).name}</p>
                    </div>
                  </div>
                  {/* Play icon overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Image
                    src={(item as ImageItem).src}
                    alt={(item as ImageItem).alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjJkN2U1Ii8+PC9zdmc+"
                    onLoadingComplete={() => setIsLoadingImages(false)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#E73992]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <p className="text-white font-medium text-sm">{(item as ImageItem).caption}</p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Centered last row if needed */}
        {shouldCenter && lastRowItemCount > 0 && (
          <div className="flex justify-center gap-4 mt-4">
            {items.slice(lastRowStartIndex).map((item) => (
              <div
                key={item.id}
                className="relative aspect-[3/4] overflow-hidden rounded-xl shadow-md cursor-pointer group"
                style={{ width: isMobile ? 'calc(50% - 0.5rem)' : 'calc(25% - 0.75rem)', maxWidth: '300px' }}
                onClick={() => {
                  if (isVideo) {
                    setSelectedVideo(item.id as string);
                  } else {
                    setSelectedImage(item.id as number);
                  }
                }}
              >
                {selectedCategory === "all" && isLoadingImages ? (
                  <ImageSkeleton />
                ) : isVideo ? (
                  <>
                    {/* YouTube iframe thumbnail */}
                    <div className="absolute inset-0 w-full h-full">
                      <Image
                        src={`https://img.youtube.com/vi/${(item as VideoItem).youtubeId}/maxresdefault.jpg`}
                        alt={(item as VideoItem).name}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          e.currentTarget.src = `https://img.youtube.com/vi/${(item as VideoItem).youtubeId}/0.jpg`;
                        }}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <p className="text-white text-sm font-medium">{(item as VideoItem).name}</p>
                      </div>
                    </div>
                    {/* Play icon overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <Image
                      src={(item as ImageItem).src}
                      alt={(item as ImageItem).alt}
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      placeholder="blur"
                      blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjJkN2U1Ii8+PC9zdmc+"
                      onLoadingComplete={() => setIsLoadingImages(false)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#E73992]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <p className="text-white font-medium text-sm">{(item as ImageItem).caption}</p>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
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
          animate={{ opacity: 1, y: 0 }}
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
        
        {/* Gallery content - with custom rendering */}
        <div className="relative">
          {selectedCategory === "all" ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={randomAllPhotos.map(img => img.id).join('-')}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {renderGridItems(displayedImages, false)}
              </motion.div>
            </AnimatePresence>
          ) : (
            renderGridItems(
              isVideoTab ? getDisplayedVideos() : displayedImages,
              isVideoTab
            )
          )}
        </div>
        
        {/* Photo Lightbox modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-90 z-[100] flex items-center justify-center p-4"
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
        
        {/* Video Popup Dialog - Story format */}
        {isClient && (
          <AnimatePresence>
            {selectedVideo && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                onClick={() => setSelectedVideo(null)}
              >
                {/* Semi-transparent overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-80" />
                
                {/* Popup Dialog - Story format */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="relative w-full max-w-md aspect-[9/16] z-[110] bg-black rounded-2xl overflow-hidden shadow-2xl"
                  onClick={e => e.stopPropagation()}
                >
                  {/* Close button */}
                  <button 
                    onClick={() => setSelectedVideo(null)}
                    className="absolute top-4 right-4 z-[120] bg-white/20 backdrop-blur-sm text-white hover:text-pink-300 p-2 rounded-full transition-colors duration-200"
                    aria-label="Close modal"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  
                  {/* Video container */}
                  <div className="relative w-full h-full">
                    {storyVideos.find(v => v.id === selectedVideo) && (
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${storyVideos.find(v => v.id === selectedVideo)!.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${storyVideos.find(v => v.id === selectedVideo)!.youtubeId}&controls=1&showinfo=0&rel=0&modestbranding=1`}
                        title={storyVideos.find(v => v.id === selectedVideo)!.name}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
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
      
      {/* Add shimmer animation to global styles */}
      <style jsx global>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </section>
  );
} 