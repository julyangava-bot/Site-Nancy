"use client";
import { IconCheck } from "@tabler/icons-react";
import Image from "next/image";
import { motion } from "motion/react";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Testimonial data for PinkDog
const testimonialData = [
  {
    image: "/images/testimonial/testimonial-maltese.jpg",
    quote:
      "Since we discovered the PinkDog Hotel, we've trusted them completely. Our Maltese always comes back happy, clean, and well cared for. The team is kind and truly makes a difference.",
    name: "J. M., Customer",
  },
  {
    image: "/images/testimonial/testimonial-yorkie.png",
    quote:
      "Nancy has been our Yorkie groomer for 9 years (from birth), and she now also takes care of our 3-year-old dog. She is an excellent groomer and has great medical help as well.",
    name: "E. M., Customer",
  },
  {
    image: "/images/testimonial/testimonial-bd.jpg",
    quote:
      "We've been using the PinkDog Hotel for a few months now. The care, comfort, and attention they give our dogs is amazing. We've trusted their team since day one.",
    name: "B. D., Customer",
  },
  {
    image: "/images/testimonial/testimonial-anna.jpg", // novo avatar da Anna
    quote:
      "My cat Anna stayed at PinkDog Hotel for a weekend and loved it! She came back calm, clean, and clearly well looked after. Great experience from start to finish.",
    name: "T.B., Customer",
  },
];

export function Testimonials() {
  const [activeBubble, setActiveBubble] = useState<number | null>(null);

  return (
    <section className="relative w-full py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-0 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 px-4">
            <h2 className="text-4xl font-semibold">
              What <span className="text-pink-600">Our Clients </span>
              Are Saying
            </h2>

            <p className="text-gray-700 text-lg max-w-md">
              At PinkDog Pet Resort, we prioritize quality and care for your pet.
              See what our clients have to say about our services.
            </p>

            <div className="space-y-4">
              {[
                "Personalized and loving care",
                "Trained and experienced professionals",
                "Safe and comfortable environment",
                "High quality products",
                "Your pet returns home happy",
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-pink-200 flex items-center justify-center">
                    <IconCheck className="w-3 h-3 text-pink-600" />
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

              <Link 
                href="https://booking.appointy.com/en-US/pinkdogresort/bookings/service"
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-50 inline-flex items-center justify-center bg-gradient-to-r from-pink-400 to-pink-600 text-white px-6 py-2.5 rounded-full hover:opacity-90 transition-all duration-200 shadow-[0_1px_2px_rgba(0,0,0,0.2)] font-medium"
              >
                Try PinkDog Today
              </Link>
            </div>
     
          {/* Right Side - Orbiting Avatars */}
          <div className="relative h-[600px] pt-34">
            <OrbitingIconsWithBubbles
              centerIcon={
                <div className="p-4 mb-25 overflow-hidden z-20 flex items-center justify-center">
                  <PawStarsIcon className="w-24 h-24" />
                </div>
              }
              testimonials={testimonialData}
              className="w-full h-full ml-20"
              activeBubble={activeBubble}
              setActiveBubble={setActiveBubble}
            />
          </div>
          <div className="absolute inset-0 z-0 w-full h-full bg-gradient-to-l from-white via-white/5 to-transparent hidden lg:block" />
        </div>
      </div>
    </section>
  );
}

const PawStarsIcon = ({ className }: { className?: string }) => {
  return (
    <div className={cn("relative", className)}>
      {/* Paw Icon */}
      <Image
        src="/images/pinkdog_original_no_txt.png"
        alt="PinkDog Pet Resort Logo"
        className="block"
        width={100}
        height={100}
      />

      {/* Small star decorations */}
      <motion.div
        className="absolute -top-1 -right-1 w-4 h-4 text-pink-400"
        initial={{ scale: 0, rotate: 0 }}
        animate={{ scale: [0, 1, 0], rotate: 180 }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.45 4.73L5.82 21 12 17.27z" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute -bottom-2 -left-1 w-3 h-3 text-pink-300"
        initial={{ scale: 0, rotate: 0 }}
        animate={{ scale: [0, 1, 0], rotate: 180 }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.45 4.73L5.82 21 12 17.27z" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-2 -left-2 w-2 h-2 text-pink-200"
        initial={{ scale: 0, rotate: 0 }}
        animate={{ scale: [0, 1, 0], rotate: 180 }}
        transition={{ duration: 2, repeat: Infinity, delay: 0 }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.45 4.73L5.82 21 12 17.27z" />
        </svg>
      </motion.div>
    </div>
  );
};

// Speech bubble component with updated colors
const SpeechBubble = ({ text, name }: { text: string; name: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="absolute -top-[140px] left-1/2 -translate-x-1/2 z-30 w-[210px] bg-gradient-to-br from-pink-50 via-white to-pink-100 rounded-lg p-3 shadow-md speech-bubble border border-pink-200"
    >
      <p className="text-xs text-gray-700 italic">&quot;{text}&quot;</p>
      <p className="text-[10px] text-pink-600 font-medium mt-1">{name}</p>
      <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b border-r border-pink-200 transform rotate-45" />
    </motion.div>
  );
};

const OrbitingIconsWithBubbles = ({
  centerIcon,
  testimonials,
  className,
  setActiveBubble,
}: {
  centerIcon?: React.ReactNode;
  testimonials: Array<{
    image: string;
    quote: string;
    name: string;
  }>;
  className?: string;
  activeBubble: number | null;
  setActiveBubble: (index: number | null) => void;
}) => {
  const radius = 200; // Increased radius to accommodate more faces
  const speed = 25; // seconds for a complete rotation

  useEffect(() => {
    const interval = setInterval(() => {
      const nowSeconds = Date.now() / 1000;
      const rotationProgress = (nowSeconds % speed) / speed;
      const rotationDegrees = rotationProgress * 360;

      const iconCount = testimonials.length;
      const angleStep = 360 / iconCount;

      for (let i = 0; i < iconCount; i++) {
        const iconAngle = (i * angleStep + rotationDegrees) % 360;

        // Keep tracking active position but we'll show all bubbles anyway
        if (iconAngle > 300 || iconAngle < 60) {
          setActiveBubble(i);
          return;
        }
      }

      setActiveBubble(null);
    }, 100);

    return () => clearInterval(interval);
  }, [testimonials.length, setActiveBubble, speed]);

  const iconCount = testimonials.length;
  const angleStep = 360 / iconCount;
  const angles = Array.from({ length: iconCount }, (_, i) => angleStep * i);

  return (
    <div className={cn("relative", className)}>
      {centerIcon && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          {centerIcon}
        </div>
      )}

      <div className="absolute top-0 left-0 w-full h-full">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: radius * 2 + "px",
            height: radius * 2 + "px",
          }}
        />

        {angles.map((angle, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              width: "40px",
              height: "40px",
              left: `calc(50% - 20px)`,
              top: `calc(50% - 20px)`,
              transformOrigin: "center center",
            }}
            initial={{ rotate: angle }}
            animate={{ rotate: [angle, angle + 360] }}
            transition={{
              rotate: {
                duration: speed,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            <div
              style={{
                position: "absolute",
                left: `${radius}px`,
                transformOrigin: "center center",
              }}
            >
              <motion.div
                initial={{ rotate: -angle }}
                animate={{ rotate: [-angle, -angle - 360] }}
                transition={{
                  duration: speed,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="relative"
              >
                <div className="w-[100px] h-[100px] overflow-hidden rounded-[100px] bg-gray-400 bg-cover bg-center bg-no-repeat shadow-[0px_44px_12px_0px_rgba(0,0,0,0.00),_0px_28px_11px_0px_rgba(0,0,0,0.03),_0px_16px_10px_0px_rgba(0,0,0,0.11),_0px_7px_7px_0px_rgba(0,0,0,0.19),_0px_2px_4px_0px_rgba(0,0,0,0.22)]">
                  <Image
                    src={testimonials[i].image}
                    alt={testimonials[i].name}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Show all speech bubbles by removing the condition */}
                <SpeechBubble
                  text={testimonials[i].quote}
                  name={testimonials[i].name}
                />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
