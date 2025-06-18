import React from "react";
import { ServicePageLayout } from "@/components/service-page-layout";
import { Clock, Heart, Users, Cat, Home, Activity } from "lucide-react";

export default function PetHotelPage() {
  const features = [
    {
      icon: <Home className="w-7 h-7" />,
      title: "🛏 Private Climate-Controlled Suites",
      description: "Each pet enjoys their own space with soft bedding, clean surroundings, and constant temperature regulation."
    },
    {
      icon: <Heart className="w-7 h-7" />,
      title: "💗 Daily Health & Wellness Monitoring",
      description: "Our trained staff conducts daily check-ins, ensuring every guest is healthy, eating well, and emotionally settled."
    },
    {
      icon: <Clock className="w-7 h-7" />,
      title: "⏰ Tailored Feeding & Medication Schedules",
      description: "We follow your instructions for meals, treats, supplements, and medications to maintain their routine."
    },
    {
      icon: <Users className="w-7 h-7" />,
      title: "🐾 Safe, Supervised Group Play",
      description: "Carefully monitored play sessions with temperament-matched dogs for social interaction and confidence building."
    },
    {
      icon: <Activity className="w-7 h-7" />,
      title: "🧠 Mental & Emotional Stimulation",
      description: "Interactive toys, group activities, and fresh routines to prevent boredom and anxiety."
    },
    {
      icon: <Cat className="w-7 h-7" />,
      title: "🐱 Dedicated Cat Comfort Area",
      description: "Quiet, separate cat suite area with cozy nooks, toys, and peaceful environment designed for tranquility."
    }
  ];

  const benefits = [
    "Private, climate-controlled pet suites with soft bedding",
    "24/7 monitored facility with trained staff supervision",
    "Personalized feeding and medication administration",
    "Safe social interaction with temperament-matched pets",
    "Mental stimulation through interactive toys and activities",
    "Separate quiet areas for cats with specialized care",
    "Spacious indoor & outdoor play yards",
    "Add-on spa or grooming services during stay",
    "Easy parking and drop-off access",
    "One-on-one enrichment for pets needing individual attention"
  ];

  const whyChoosePinkDog = [
    "Science-based care combined with deep love for animals",
    "Over 23 years of experience in professional pet care",
    "Latin women-led business that values trust and community",
    "Structured social interaction that builds confidence and improves behavior",
    "Stress-free environment that mirrors home routines",
    "Gentle introductions for pets who prefer solitude or need time to adjust"
  ];



  return (
    <ServicePageLayout
      title="Pet"
      subtitle="Hotel"
      description="Comfort. Care. Companionship. When you're away, your pet deserves a place where they'll be not only safe—but genuinely happy. Our overnight hotel offers a stress-free, cozy environment where dogs and cats can rest, play, and enjoy companionship in a well-supervised, loving atmosphere."
      heroImage="/images/services/pet-hotel-card.png"
      features={features}
      benefits={benefits}
      howItWorks={whyChoosePinkDog}
      serviceArea={{
        title: "🌿 Our Facility Features",
        description: "We combine science-based care, a deep love for animals, and over 23 years of experience to ensure your pet's stay is as enjoyable as possible. Leaving your pet doesn't have to be stressful—with us, it's a positive, engaging experience that supports their physical and emotional well-being."
      }}
      ctaText="Book Pet Hotel"
      ctaLink="/#checkin-info"
      secondButtonText="Have Questions?"
    />
  );
} 