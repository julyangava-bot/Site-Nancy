"use client";
import React, { useState } from "react";
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
      className: "p-8 sm:p-12"
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
    },
    [
      // Autoplay plugin
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
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  return (
    <div className="relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero content */}
        <div className="relative pt-16 pb-12 sm:pt-20 md:pt-24 md:pb-16 min-h-0 lg:min-h-[calc(100vh-6rem)] max-h-[900px] flex flex-col lg:flex-row items-center justify-center">
          <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-6 md:gap-8 lg:gap-10">
            {/* Text content */}
            <div className="max-w-xl w-full text-center lg:text-left z-10">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-gray-900 font-display"
              >
                Welcome to <span className="text-[#E73992]">Pink Dog</span>
                <span className="block mt-1 sm:mt-2">Your Pet&apos;s Favorite Place!</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl"
              >
                Pet Hotel • Daycare • Grooming – All with ❤️
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-6 sm:mt-8 flex flex-row justify-center lg:justify-start gap-3 sm:gap-4"
              >
                <Button
                  className="bg-[#E73992] text-white hover:bg-[#d3337f] text-sm sm:text-base px-5 sm:px-6 py-2 sm:py-3 h-auto rounded-full"
                  asChild
                >
                  <Link href="/booking">Book Now</Link>
                </Button>
                <Button
                  className="bg-white text-[#E73992] border border-[#E73992] hover:bg-[#FCD1E6] hover:text-[#E73992] hover:border-[#E73992] text-sm sm:text-base px-5 sm:px-6 py-2 sm:py-3 h-auto rounded-full"
                  asChild
                >
                  <Link href="/services">View Services</Link>
                </Button>
              </motion.div>
            </div>
            
            {/* Image Carousel with Keen Slider */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative z-10 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
            >
              <div className="relative">
                {/* Keen Slider carousel */}
                <div ref={sliderRef} className="keen-slider h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px]">
                  {imageConfig.carousel.map((image, idx) => (
                    <div key={idx} className={`keen-slider__slide ${image.className} flex items-center justify-center`}>
                      <div className="w-full h-full relative">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          priority={idx === 0}
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 600px, 500px"
                          className="object-contain"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Navigation dots */}
                <div className="flex justify-center gap-2 mt-3 sm:mt-4">
                  {[...Array(imageConfig.carousel.length)].map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        instanceRef.current?.moveToIdx(idx);
                      }}
                      className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full transition-colors ${
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
      
      {/* Integrated pink wave bottom border with decorative elements */}
      <div className="relative w-full h-16 sm:h-24 md:h-32 overflow-hidden bg-gradient-to-b from-white to-white">
        {/* Curved pink shape smoothly integrated with background */}
        <div className="absolute -bottom-0 left-0 right-0 h-16 sm:h-24 md:h-32 bg-[#FCD1E6]">
          <div className="absolute -top-16 sm:-top-24 md:-top-32 left-0 right-0 h-16 sm:h-24 md:h-32 bg-white rounded-b-[50%]"></div>
        </div>
        
        {/* Small decorative elements on the wave */}
        <div className="absolute bottom-6 left-1/4 w-3 h-3 rounded-full bg-[#E73992] opacity-30"></div>
        <div className="absolute bottom-10 right-1/3 w-4 h-4 rounded-full bg-[#E73992] opacity-20"></div>
      </div>
      
      {/* Background decoration elements */}
      <div className="absolute -top-20 -right-20 w-40 h-40 md:w-64 md:h-64 rounded-full bg-[#FCD1E6] opacity-20"></div>
      <div className="absolute -bottom-32 -left-32 w-64 h-64 md:w-96 md:h-96 rounded-full bg-[#FCD1E6] opacity-20"></div>
      <div className="absolute top-1/2 right-10 transform -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#E73992] opacity-40"></div>
      <div className="absolute top-1/4 left-10 w-4 h-4 md:w-6 md:h-6 rounded-full bg-[#E73992] opacity-30"></div>
    </div>
  );
}
