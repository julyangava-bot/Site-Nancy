"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface PawPrintProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  position?: string;
  rotation?: number;
  delay?: number;
  floating?: boolean;
}

export function PawPrint({
  className = "",
  size = "md",
  position = "top-0 left-0",
  rotation = 0,
  delay = 0,
  floating = true
}: PawPrintProps) {
  const sizes = {
    sm: 30,
    md: 50,
    lg: 80
  };

  const imgSize = sizes[size];
  
  // Simpler, less resource-intensive animation
  const floatingVariants = {
    initial: { opacity: 0.1 },
    animate: { 
      opacity: floating ? [0.1, 0.2, 0.1] : 0.1,
      transition: {
        delay: delay,
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "linear" as const
      }
    }
  };

  return (
    <motion.div
      className={`absolute ${position} z-0 will-change-opacity ${className}`}
      initial="initial"
      animate="animate"
      variants={floatingVariants}
      style={{ 
        transform: `rotate(${rotation}deg)`,
        contain: 'layout paint style',
      }}
    >
      <Image 
        src="/images/paw-print.svg"
        alt="Paw print decoration"
        width={imgSize}
        height={imgSize}
        className="object-contain"
      />
    </motion.div>
  );
}

interface PawPrintsDecorationProps {
  count?: number;
  className?: string;
}

export function PawPrintsDecoration({ count = 5, className = "" }: PawPrintsDecorationProps) {
  // Client-side only state to prevent hydration mismatch
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    setIsMobile(window.innerWidth < 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  if (!isMounted) {
    return null; // Return nothing during SSR to prevent hydration mismatch
  }
  
  const actualCount = isMobile ? Math.min(4, count) : count;
  
  // Use predefined positions instead of random ones to avoid hydration errors
  const predefinedPaws = [
    { size: "sm", position: "top-5% left-10%", rotation: 15, delay: 0, floating: true },
    { size: "md", position: "top-20% right-5%", rotation: 45, delay: 0.4, floating: true },
    { size: "lg", position: "bottom-15% left-8%", rotation: 30, delay: 0.8, floating: false },
    { size: "md", position: "bottom-30% right-15%", rotation: 90, delay: 1.2, floating: true },
    { size: "sm", position: "top-40% left-20%", rotation: 60, delay: 1.6, floating: false },
    { size: "lg", position: "top-70% right-25%", rotation: 120, delay: 2.0, floating: true },
    { size: "md", position: "bottom-10% right-40%", rotation: 210, delay: 2.4, floating: true },
    { size: "sm", position: "top-60% left-30%", rotation: 180, delay: 2.8, floating: false }
  ];
  
  // Use only the requested number of paw prints
  const pawPrints = predefinedPaws.slice(0, actualCount);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} style={{ contain: 'content' }}>
      {pawPrints.map((paw, index) => (
        <PawPrint
          key={index}
          size={paw.size as 'sm' | 'md' | 'lg'}
          position={paw.position}
          rotation={paw.rotation}
          delay={paw.delay}
          floating={paw.floating}
        />
      ))}
    </div>
  );
}

interface WalkingPawPrintsProps {
  direction?: 'right' | 'left';
  className?: string;
}

// Create a client-only component that renders only after mounting
function ClientWalkingPawPrints({ direction = 'right', className = "" }: WalkingPawPrintsProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return <div className={`relative ${className}`}></div>; // Empty placeholder during SSR
  }
  
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const pawCount = isMobile ? 4 : 8;
  
  return (
    <div className={`relative ${className} overflow-hidden`} style={{ contain: 'layout' }}>
      {Array.from({ length: pawCount }).map((_, idx) => {
        // Alternating left and right paws
        const isRightPaw = idx % 2 === 0;
        // Staggered positioning for more natural gait
        const verticalOffset = isRightPaw ? 0 : 28;
        // Alternate slight rotation for natural look
        const rotation = isRightPaw ? 10 : -10;
        
        return (
          <motion.div
            key={idx}
            className={`absolute ${direction === 'right' ? 'left-0' : 'right-0'} pointer-events-none`}
            style={{
              top: `calc(50% - 12px + ${verticalOffset}px)`,
              contain: 'paint layout',
            }}
            initial={{ 
              opacity: 0, 
              x: direction === 'right' ? -50 : 50,
            }}
            animate={{ 
              opacity: [0, 0.3, 0],
              x: direction === 'right' 
                ? [idx * -60, (idx + 3) * 60, (idx + 5) * 60] 
                : [idx * 60, -((idx + 3) * 60), -((idx + 5) * 60)]
            }}
            transition={{
              duration: isMobile ? 6 : 5,
              delay: idx * 0.8,
              repeat: Infinity,
              repeatDelay: (pawCount - 1) * 0.8
            }}
          >
            <div style={{ transform: `rotate(${rotation}deg)` }} className="opacity-30">
              <Image 
                src="/images/paw-print.svg"
                alt="Walking paw print"
                width={24}
                height={24}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// Export a wrapper that only renders the component client-side
export function WalkingPawPrints(props: WalkingPawPrintsProps) {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Return an empty div during SSR to prevent hydration issues
  if (!isMounted) {
    return <div className={`relative ${props.className}`}></div>;
  }
  
  return <ClientWalkingPawPrints {...props} />;
} 