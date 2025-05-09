"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function InstitutionalVideo() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const videoId = "5hPThvAmHMg";
  
  // Monitor iframe load state
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // If video doesn't load within 3 seconds, show fallback
      if (!videoLoaded) {
        setShowFallback(true);
      }
    }, 3000);
    
    return () => clearTimeout(timeoutId);
  }, [videoLoaded]);
  
  // Handle iframe load event
  const handleIframeLoad = () => {
    setVideoLoaded(true);
  };
  
  return (
    <section id="philosophy" className="relative py-24 bg-[#E73992]">
      {/* Top modern gradient transition - adjusted to keep consistent color at title level */}
      <div className="absolute top-0 left-0 right-0 h-32 overflow-hidden">
        <div 
          className="absolute top-0 left-0 w-full h-32"
          style={{ 
            background: "linear-gradient(to bottom, #FFDCEF 0%, #F9B6D9 15%, #F389C1 30%, #EB6DB0 45%, #E73992 55%)"
          }}
        />
        
        {/* Subtle waves overlay for texture */}
        <svg 
          className="absolute top-0 left-0 w-full opacity-40" 
          viewBox="0 0 1440 320" 
          preserveAspectRatio="none"
          style={{ height: '100%', width: '100%', transform: 'rotate(180deg)' }}
        >
          <path 
            fill="#ffffff" 
            fillOpacity="0.15" 
            d="M0,192L60,181.3C120,171,240,149,360,154.7C480,160,600,192,720,186.7C840,181,960,139,1080,133.3C1200,128,1320,160,1380,176L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
        
        <svg 
          className="absolute top-0 left-0 w-full opacity-20" 
          viewBox="0 0 1440 320" 
          preserveAspectRatio="none"
          style={{ height: '70%', width: '100%', transform: 'rotate(180deg)' }}
        >
          <path 
            fill="#ffffff" 
            fillOpacity="0.15" 
            d="M0,128L48,144C96,160,192,192,288,197.3C384,203,480,181,576,186.7C672,192,768,224,864,218.7C960,213,1056,171,1152,154.7C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
      
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative pb-10">
        {/* Header section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            {/* Best Grooming medal moved to left of title */}
            <div className="flex-shrink-0 w-20 h-20">
              <div className="relative w-full h-full">
                <Image
                  src="/images/best-grooming.png"
                  alt="Best Grooming Medal"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Our Philosophy
            </h2>
          </div>
          
          <div className="flex flex-col md:flex-row items-center md:items-center justify-center gap-8 max-w-4xl mx-auto">
            <div className="flex-1 text-center md:text-right">
              <p className="text-white text-lg">
                We know every dog is different from another. Also, every owner is different from another. As people, each dog has its own issues, fears, behavior, and background. For this reason, we want to <span className="font-bold">KNOW</span> you and your pet! And you, want to know more about our groomers?
              </p>
              
              {/* Learn more link */}
              <Link
                href="#about-us"
                className="inline-flex items-center text-white hover:text-pink-100 transition-colors mt-6 text-lg font-light"
              >
                <span>Learn more</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </motion.div>
        
        {/* Centered video container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden shadow-xl mx-auto max-w-4xl bg-black mb-8"
        >
          <div className="relative aspect-video w-full">
            {/* YouTube iframe with autoplay and loop */}
            <iframe 
              ref={iframeRef}
              onLoad={handleIframeLoad}
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&color=white`}
              title="Pink Dog Institutional Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              className={`w-full h-full absolute inset-0 ${showFallback ? 'opacity-0' : 'opacity-100'}`}
              frameBorder="0"
            ></iframe>
            
            {/* Fallback thumbnail (shown if iframe doesn't load properly) */}
            {showFallback && (
              <Link href={`https://youtu.be/${videoId}`} target="_blank" rel="noopener noreferrer">
                <div className="absolute inset-0 w-full h-full">
                  <Image 
                    src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                    alt="Pink Dog Institutional Video"
                    fill
                    className="object-cover"
                    onError={(e) => {
                      e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/0.jpg`;
                    }}
                  />
                  
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-all duration-300 hover:bg-black/40">
                    <div className="bg-white/90 rounded-full p-5 shadow-lg transform transition-transform duration-300 hover:scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-[#E73992]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </motion.div>
      </div>
      
      {/* Bottom modern gradient transition */}
      <div className="absolute -bottom-1 left-0 right-0 overflow-hidden" style={{ height: '120px' }}>
        <div 
          className="absolute bottom-0 left-0 w-full h-full"
          style={{ 
            background: "linear-gradient(to top, #ffffff 0%, #FEF0F7 40%, #FADBE9 70%, #F6B8D9 85%, rgba(231, 57, 146, 0.2) 100%)"
          }}
        />
        
        {/* Subtle waves overlay for texture */}
        <svg 
          className="absolute bottom-0 left-0 w-full opacity-40" 
          viewBox="0 0 1440 320" 
          preserveAspectRatio="none"
          style={{ height: '100%', width: '100%' }}
        >
          <path 
            fill="#ffffff" 
            fillOpacity="0.2" 
            d="M0,192L60,181.3C120,171,240,149,360,154.7C480,160,600,192,720,186.7C840,181,960,139,1080,133.3C1200,128,1320,160,1380,176L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
        
        <svg 
          className="absolute bottom-0 left-0 w-full opacity-30" 
          viewBox="0 0 1440 320" 
          preserveAspectRatio="none"
          style={{ height: '80%', width: '100%' }}
        >
          <path 
            fill="#ffffff" 
            fillOpacity="0.15" 
            d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,96C672,96,768,128,864,133.3C960,139,1056,117,1152,112C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
} 