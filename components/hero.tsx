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
      className: "p-16"
    },
    {
      src: "/images/pinkdog-mascots.png", 
      alt: "Pink Dog Friends",
      width: 500,
      height: 700,
      className: ""
    }
  ],
  // Video source
  video: {
    sources: [
      { src: "/images/pingdog-animate.mp4.gif", type: "video/mp4" },
      { src: "/images/pingdog-animate.mov", type: "video/quicktime" },
    ],
    poster: "/images/pinkdog-mascots.png"
  },
  // Decorative elements
  decorative: [
    {
      src: "/images/pinkdog-flow.png",
      alt: "Decorative element bottom left",
      width: 40,
      height: 40,
      position: "absolute -bottom-4 -left-6 w-10 h-10 opacity-50"
    },
    {
      src: "/images/pinkdog-flow.png",
      alt: "Decorative element top right",
      width: 30,
      height: 30,
      position: "absolute -top-8 -right-4 w-8 h-8 opacity-40"
    }
  ]
};

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const handleVideoError = () => {
    console.error("Video failed to load");
    setVideoError(true);
  };

  const handleVideoLoaded = () => {
    console.log("Video loaded successfully");
    setVideoLoaded(true);
  };

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
      {/* Pink wave background */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-[#FCD1E6] rounded-t-[50%] transform translate-y-16"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero content */}
        <div className="relative pt-24 pb-20 sm:pt-28 md:pt-32 lg:pt-32 lg:pb-28 min-h-[calc(100vh-4rem)]">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            {/* Text content */}
            <div className="max-w-2xl text-center lg:text-left z-10">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 font-display"
              >
                Welcome to <span className="text-[#E73992]">Pink Dog</span>
                <span className="block mt-2">Your Pet&apos;s Favorite Place!</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl"
              >
                Pet Hotel • Daycare • Grooming – All with ❤️
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
              >
                <Button
                  className="bg-[#E73992] text-white hover:bg-[#d3337f] text-base px-8 py-6 h-auto rounded-full"
                  asChild
                >
                  <Link href="/booking">Book Now</Link>
                </Button>
                <Button
                  className="bg-white text-[#E73992] border-2 border-[#E73992] hover:bg-[#FCD1E6] hover:text-[#E73992] hover:border-[#E73992] text-base px-8 py-6 h-auto rounded-full"
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
              className="relative z-10 w-full max-w-md lg:max-w-lg xl:max-w-xl"
            >
              <div className="relative">
                {/* Keen Slider carousel */}
                <div ref={sliderRef} className="keen-slider h-[800px]">
                  {imageConfig.carousel.map((image, idx) => (
                    <div key={idx} className={`keen-slider__slide ${image.className} flex items-center justify-center`}>
                      <div className="w-full h-[800px] relative">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          priority={idx === 0}
                          sizes="(max-width: 768px) 100vw, 500px"
                          className="object-contain"
                        />
                      </div>
                    </div>
                  ))}
                  
                  {/* Video slide */}
                  <div className="keen-slider__slide flex items-center justify-center">
                    <div className="w-full h-[800px] relative">
                      {videoError ? (
                        <Image
                          src={imageConfig.video.poster}
                          alt="Video fallback"
                          fill
                          priority
                          sizes="(max-width: 768px) 100vw, 500px"
                          className="object-contain"
                        />
                      ) : (
                        <>
                          {!videoLoaded && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Image
                                src={imageConfig.video.poster}
                                alt="Video loading"
                                fill
                                priority
                                sizes="(max-width: 768px) 100vw, 500px"
                                className="object-contain"
                              />
                            </div>
                          )}
                          <video
                            id="hero-video"
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="auto"
                            className={`w-full h-full object-contain absolute inset-0 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
                            poster={imageConfig.video.poster}
                            onError={handleVideoError}
                            onLoadedData={handleVideoLoaded}
                          >
                            {imageConfig.video.sources.map((source, i) => (
                              <source key={i} src={source.src} type={source.type} />
                            ))}
                            Your browser does not support the video tag.
                          </video>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Navigation dots */}
                <div className="flex justify-center gap-2 mt-4">
                  {[...Array(imageConfig.carousel.length + 1)].map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        instanceRef.current?.moveToIdx(idx);
                      }}
                      className={`w-3 h-3 rounded-full transition-colors ${
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
      
      {/* Background decoration elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#FCD1E6] opacity-20"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#FCD1E6] opacity-20"></div>
      <div className="absolute top-1/2 right-10 transform -translate-y-1/2 w-4 h-4 rounded-full bg-[#E73992] opacity-40"></div>
      <div className="absolute top-1/4 left-10 w-6 h-6 rounded-full bg-[#E73992] opacity-30"></div>
    </div>
  );
}
