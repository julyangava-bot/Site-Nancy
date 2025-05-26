import React from "react";
import { ServicePageLayout } from "@/components/service-page-layout";
import { Sparkles, Heart, Shield, Clock, Award, Scissors } from "lucide-react";

export default function GroomingPage() {
  const features = [
    {
      icon: <Scissors className="w-7 h-7" />,
      title: "Professional Styling",
      description: "Expert grooming tailored to your pet's breed and your style preferences."
    },
    {
      icon: <Sparkles className="w-7 h-7" />,
      title: "Premium Products",
      description: "High-quality, hypoallergenic shampoos and conditioners for sensitive skin."
    },
    {
      icon: <Heart className="w-7 h-7" />,
      title: "Gentle Handling",
      description: "Patient, loving care especially for anxious or senior pets."
    },
    {
      icon: <Shield className="w-7 h-7" />,
      title: "Health Check",
      description: "We'll alert you to any skin issues, lumps, or concerns we notice during grooming."
    },
    {
      icon: <Clock className="w-7 h-7" />,
      title: "Quick Service",
      description: "Most grooming completed within 2-3 hours to minimize stress."
    },
    {
      icon: <Award className="w-7 h-7" />,
      title: "Certified Groomers",
      description: "Our team is professionally trained and certified in pet grooming."
    }
  ];

  const benefits = [
    "Full bath with premium shampoo & conditioner",
    "Blow-dry and brush out",
    "Nail trimming and filing",
    "Ear cleaning and plucking",
    "Teeth brushing",
    "Anal gland expression (upon request)",
    "Breed-specific or custom haircuts",
    "De-shedding treatment available",
    "Flea and tick treatment options",
    "Complimentary bandana or bow"
  ];

  const pricing = [
    {
      title: "Basic Grooming",
      price: "$40",
      period: "starting at",
      features: [
        "Bath & blow-dry",
        "Nail trim",
        "Ear cleaning",
        "Basic brush out"
      ]
    },
    {
      title: "Full Grooming",
      price: "$65",
      period: "starting at",
      features: [
        "Everything in Basic",
        "Full haircut",
        "Teeth brushing",
        "Gland expression"
      ]
    },
    {
      title: "Deluxe Spa",
      price: "$95",
      period: "starting at",
      features: [
        "Everything in Full",
        "De-shedding treatment",
        "Paw treatment",
        "Facial massage"
      ]
    }
  ];

  return (
    <ServicePageLayout
      title="Professional"
      subtitle="Grooming"
      description="Pamper your pet with our professional grooming services! From basic baths to breed-specific styling, our expert groomers will have your furry friend looking and feeling their absolute best. We use only premium products and gentle techniques."
      heroImage="/images/services/grooming.jpg"
      features={features}
      benefits={benefits}
      pricing={pricing}
      ctaText="Book Grooming"
    />
  );
} 