import React from "react";
import { ServicePageLayout } from "@/components/service-page-layout";
import { Clock, Shield, Heart, Award, Users, Bed } from "lucide-react";

export default function PetHotelPage() {
  const features = [
    {
      icon: <Shield className="w-7 h-7" />,
      title: "24/7 Supervision",
      description: "Round-the-clock care with trained professionals monitoring your pet's comfort and safety."
    },
    {
      icon: <Bed className="w-7 h-7" />,
      title: "Comfortable Accommodations",
      description: "Spacious, climate-controlled rooms with cozy bedding and personal space for each guest."
    },
    {
      icon: <Heart className="w-7 h-7" />,
      title: "Personalized Care",
      description: "Individual attention tailored to your pet's specific needs, preferences, and routine."
    },
    {
      icon: <Users className="w-7 h-7" />,
      title: "Social Playtime",
      description: "Optional supervised group play sessions for socialization with other friendly pets."
    },
    {
      icon: <Clock className="w-7 h-7" />,
      title: "Flexible Check-in/out",
      description: "Convenient drop-off and pick-up times to accommodate your travel schedule."
    },
    {
      icon: <Award className="w-7 h-7" />,
      title: "Health Monitoring",
      description: "Daily health checks and immediate veterinary care access if needed."
    }
  ];

  const benefits = [
    "Comfortable private suites with soft bedding",
    "Three daily walks and outdoor playtime",
    "Premium food or special diet accommodation",
    "Daily photo updates sent to your phone",
    "Medication administration if needed",
    "Temperature-controlled environment",
    "24-hour emergency veterinary access",
    "Complimentary bath before pickup (5+ nights)",
    "Personal belongings welcome (toys, blankets)",
    "Special care for senior or anxious pets"
  ];

  const pricing = [
    {
      title: "Small Dogs",
      price: "$45",
      period: "night",
      features: [
        "Under 25 lbs",
        "Private suite",
        "3 walks daily",
        "Playtime included"
      ]
    },
    {
      title: "Medium Dogs",
      price: "$55",
      period: "night",
      features: [
        "25-60 lbs",
        "Larger suite",
        "3 walks daily",
        "Extended playtime"
      ]
    },
    {
      title: "Large Dogs",
      price: "$65",
      period: "night",
      features: [
        "Over 60 lbs",
        "Extra-large suite",
        "3 walks daily",
        "Premium activities"
      ]
    }
  ];

  return (
    <ServicePageLayout
      title="Pet"
      subtitle="Hotel"
      description="Give your furry friend a vacation of their own! Our luxurious pet hotel offers comfortable accommodations, personalized care, and plenty of fun activities while you're away. Your pet will feel right at home with our loving staff and premium facilities."
      heroImage="/images/services/pet-hotel-card.png"
      features={features}
      benefits={benefits}
      pricing={pricing}
      ctaText="Reserve a Suite"
    />
  );
} 