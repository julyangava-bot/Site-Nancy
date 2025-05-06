"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

// Centralized image configuration object
const imageConfig = {
  // Carousel images
  carousel: [
    {
      src: "/images/carrosel-1.png", 
      alt: "Pink Dog Carousel Image",
      width: 500,
      height: 500,
      className: "p-6 sm:p-8"
    },
    {
      src: "/images/pinkdog-mascots.png", 
      alt: "Pink Dog Friends",
      width: 500,
      height: 700,
      className: ""
    },
    {
      src: "/images/carrosel-3.png", 
      alt: "Pink Dog Friends",
      width: 500,
      height: 700,
      className: ""
    }
  ],
  // Decorative elements
  decorative: [
    {
      src: "/images/pinkdog-flow.png",
      alt: "Decorative element bottom left",
      width: 40,
      height: 40,
      position: "absolute -bottom-3 -left-3 w-8 h-8 opacity-50 hidden md:block"
    },
    {
      src: "/images/pinkdog-flow.png",
      alt: "Decorative element top right",
      width: 30,
      height: 30,
      position: "absolute -top-6 -right-3 w-6 h-6 opacity-40 hidden md:block"
    }
  ]
};

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Control body scroll during initial load
  useEffect(() => {
    // Prevent scroll jumping by locking scroll position during initialization
    if (typeof window !== 'undefined') {
      document.body.style.overflow = 'hidden';
      
      // Set a small timeout to allow component to fully render before enabling scroll
      const timer = setTimeout(() => {
        document.body.style.overflow = '';
      }, 100);
      
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    }
  }, []);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slides: {
        perView: 1,
        spacing: 0,
      },
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      // Disable drag on mobile to prevent scroll interference
      rubberband: false,
      drag: true,
      // Add initial slide to prevent layout shift
      initial: 0,
    },
    [
      // Autoplay plugin - only start after component is fully loaded
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;
        
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 4000); // Change slide every 4 seconds
        }
        
        slider.on("created", () => {
          // Only start autoplay after component is properly rendered
          setTimeout(() => {
            slider.container.addEventListener("mouseover", () => {
              mouseOver = true;
              clearNextTimeout();
            });
            slider.container.addEventListener("mouseout", () => {
              mouseOver = false;
              nextTimeout();
            });
            nextTimeout();
          }, 500);
        });
        
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  // Custom variant for smoother animation without affecting layout
  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };
  
  // Scale variant that doesn't affect layout as much
  const scaleInVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <div className="relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero content - fixed height on mobile to prevent content shift */}
        <div className="relative pt-40 sm:pt-40 md:pt-40 pb-6 min-h-[650px] sm:min-h-[600px] md:min-h-[650px] lg:min-h-[calc(100vh-6rem)] max-h-[800px] xl:max-h-[900px] flex flex-col lg:flex-row items-center justify-center">
          <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-4 md:gap-6 lg:gap-8 xl:gap-12">
            {/* Text content */}
            <div className="max-w-xl w-full text-center lg:text-left z-10">
              <motion.h1 
                initial="hidden"
                animate="visible"
                variants={fadeInVariants}
                transition={{ duration: 0.4 }}
                className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 font-display"
              >
                Welcome to <span className="text-[#E73992]">Pink Dog</span>
                <span className="block mt-1">Your Pet&apos;s Favorite Place!</span>
              </motion.h1>
              
              <motion.p
                initial="hidden"
                animate="visible"
                variants={fadeInVariants}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 max-w-2xl"
              >
                Pet Hotel • Daycare • Grooming – All with ❤️
              </motion.p>
              
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={fadeInVariants}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mt-4 sm:mt-6 flex flex-row justify-center lg:justify-start gap-2 sm:gap-3"
              >
                <Button
                  className="bg-[#E73992] text-white hover:bg-[#d3337f] text-xs sm:text-sm px-4 sm:px-5 py-1.5 sm:py-2 h-auto rounded-full"
                  asChild
                >
                  <Link href="/booking">Book Now</Link>
                </Button>
                <Button
                  className="bg-white text-[#E73992] border border-[#E73992] hover:bg-[#FCD1E6] hover:text-[#E73992] hover:border-[#E73992] text-xs sm:text-sm px-4 sm:px-5 py-1.5 sm:py-2 h-auto rounded-full"
                  asChild
                >
                  <Link href="#services">View Services</Link>
                </Button>
              </motion.div>
            </div>
            
            {/* Image Carousel with Keen Slider */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={scaleInVariants}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative z-10 w-full max-w-[380px] sm:max-w-[420px] md:max-w-[480px] lg:max-w-lg xl:max-w-xl mt-6 sm:mt-4 md:mt-0"
            >
              <div className="relative">
                {/* Keen Slider carousel - preset height to prevent layout shift */}
                <div 
                  ref={sliderRef} 
                  className="keen-slider h-[420px] sm:h-[380px] md:h-[460px] lg:h-[500px] xl:h-[550px]"
                >
                  {imageConfig.carousel.map((image, idx) => (
                    <div 
                      key={idx} 
                      className={`keen-slider__slide ${image.className} flex items-center justify-center`}
                    >
                      <div className="w-full h-full relative">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          priority={idx === 0}
                          sizes="(max-width: 640px) 380px, (max-width: 768px) 420px, (max-width: 1024px) 480px, 600px"
                          className="object-contain"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Navigation dots */}
                <div className="flex justify-center gap-1.5 sm:gap-2 mt-2 sm:mt-3">
                  {[...Array(imageConfig.carousel.length)].map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        instanceRef.current?.moveToIdx(idx);
                      }}
                      className={`w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full transition-colors ${
                        currentSlide === idx ? 'bg-[#E73992]' : 'bg-[#FCD1E6]'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
                
                {/* Decorative elements */}
                {imageConfig.decorative.map((decoration, idx) => (
                  <div key={idx} className={decoration.position}>
                    <div className="relative w-full h-full">
                      <Image
                        src={decoration.src}
                        alt={decoration.alt}
                        fill
                        sizes="40px"
                        className="object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Integrated pink wave bottom border */}
      <div className="w-full h-14 sm:h-16 md:h-20 bg-gradient-to-b from-white to-[#FCD1E6]">
        <div className="h-full w-full bg-[#FCD1E6]/10 relative">
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#FCD1E6]/40"></div>
          
          {/* Small decorative elements */}
          <div className="absolute bottom-4 left-1/4 w-2 h-2 rounded-full bg-[#E73992] opacity-40"></div>
          <div className="absolute bottom-6 right-1/3 w-3 h-3 rounded-full bg-[#E73992] opacity-30"></div>
          <div className="absolute bottom-2 right-1/4 w-1.5 h-1.5 rounded-full bg-[#E73992] opacity-50"></div>
        </div>
      </div>
      
      {/* Background decoration elements */}
      <div className="absolute -top-16 -right-16 w-32 h-32 md:w-48 md:h-48 rounded-full bg-[#FCD1E6] opacity-20"></div>
      <div className="absolute -bottom-24 -left-24 w-48 h-48 md:w-72 md:h-72 rounded-full bg-[#FCD1E6] opacity-20"></div>
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#E73992] opacity-30"></div>
      <div className="absolute top-1/4 left-4 w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#E73992] opacity-20"></div>
    </div>
  );
}
