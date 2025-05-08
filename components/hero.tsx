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
      src: "/images/paw-print.png",
      alt: "Decorative element bottom left",
      width: 40,
      height: 40,
      position: "absolute -bottom-3 -left-3 w-8 h-8 opacity-50 hidden md:block"
    },
    {
      src: "/images/paw-print.png",
      alt: "Decorative element top right",
      width: 30,
      height: 30,
      position: "absolute -top-6 -right-3 w-6 h-6 opacity-40 hidden md:block"
    }
  ]
};

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Modified scroll control - no longer locks scrolling
  useEffect(() => {
    // We're removing the scroll locking mechanism that was causing issues
    // This allows the page to scroll normally from the beginning
    return () => {
      // Ensure scroll is enabled when component unmounts
      if (typeof window !== 'undefined') {
        document.body.style.overflow = '';
      }
    };
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
      // Autoplay plugin with optimizations
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

  // Simplified variants that won't affect scroll performance
  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };
  
  // Scale variant with optimized animations
  const scaleInVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero content with optimized layout - reduced min-height to bring elements closer */}
        <div className="relative pt-40 sm:pt-40 md:pt-40 pb-6 min-h-[600px] sm:min-h-[600px] md:min-h-[650px] lg:min-h-[calc(100vh-6rem)] max-h-[800px] xl:max-h-[900px] flex flex-col lg:flex-row items-center justify-center">
          <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-4 md:gap-6 lg:gap-8 xl:gap-12">
            {/* Text content */}
            <div className="max-w-xl w-full text-center lg:text-left z-10">
              <motion.h1 
                initial="hidden"
                animate="visible"
                variants={fadeInVariants}
                transition={{ duration: 0.4 }}
                className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 font-display"
                style={{ willChange: "opacity" }}
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
                style={{ willChange: "opacity" }}
              >
                Pet Hotel • Daycare • Grooming – All with ❤️
              </motion.p>
              
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={fadeInVariants}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mt-5 sm:mt-8 md:mt-8 flex flex-row justify-center lg:justify-start gap-3 sm:gap-4 md:gap-5"
                style={{ willChange: "opacity" }}
              >
                <Button
                  className="bg-[#E73992] text-white hover:bg-[#d3337f] text-base sm:text-base md:text-lg font-medium px-6 sm:px-6 md:px-8 py-3 sm:py-3 md:py-3.5 h-auto rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 hover:-translate-y-0.5"
                  asChild
                >
                  <Link href="/booking">Book Now</Link>
                </Button>
                <Button
                  className="bg-white text-[#E73992] border-2 border-[#E73992] hover:bg-[#FCD1E6] hover:text-[#E73992] hover:border-[#E73992] text-base sm:text-base md:text-lg font-medium px-6 sm:px-6 md:px-8 py-3 sm:py-3 md:py-3.5 h-auto rounded-full shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 hover:-translate-y-0.5"
                  asChild
                >
                  <Link href="#services">View Services</Link>
                </Button>
              </motion.div>
            </div>
            
            {/* Image Carousel with Keen Slider - optimized and reduced margin-top */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={scaleInVariants}
              className="relative z-10 w-full max-w-[380px] sm:max-w-[420px] md:max-w-[480px] lg:max-w-lg xl:max-w-xl mt-4 sm:mt-4 md:mt-0"
              style={{ willChange: "transform, opacity" }}
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
      
      {/* Simplified pink wave bottom border */}
      <div className="w-full h-14 sm:h-16 md:h-20 bg-gradient-to-b from-white to-[#FCD1E6]">
        <div className="h-full w-full bg-[#FCD1E6]/10 relative">
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#FCD1E6]/40"></div>
        </div>
      </div>
      
      {/* Simplified background decoration elements - hidden on mobile */}
      <div className="absolute -top-16 -right-16 w-32 h-32 md:w-48 md:h-48 rounded-full bg-[#FCD1E6] opacity-20 hidden sm:block"></div>
      <div className="absolute -bottom-24 -left-24 w-48 h-48 md:w-72 md:h-72 rounded-full bg-[#FCD1E6] opacity-20 hidden sm:block"></div>
    </div>
  );
}
