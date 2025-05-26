import React from "react";
import { ServicePageLayout } from "@/components/service-page-layout";
import { Users, Heart, Shield, Clock, Award, Activity } from "lucide-react";

export default function DaycarePage() {
  const features = [
    {
      icon: <Users className="w-7 h-7" />,
      title: "Supervised Socialization",
      description: "Safe group play with dogs of similar size and temperament under constant supervision."
    },
    {
      icon: <Activity className="w-7 h-7" />,
      title: "Structured Activities",
      description: "Engaging games, puzzles, and exercises to keep your pet mentally and physically stimulated."
    },
    {
      icon: <Heart className="w-7 h-7" />,
      title: "Individual Attention",
      description: "One-on-one time with our caring staff for pets who prefer personal interaction."
    },
    {
      icon: <Shield className="w-7 h-7" />,
      title: "Safe Environment",
      description: "Secure indoor and outdoor play areas designed for maximum safety and fun."
    },
    {
      icon: <Clock className="w-7 h-7" />,
      title: "Flexible Hours",
      description: "Extended hours to accommodate your work schedule, including early drop-off."
    },
    {
      icon: <Award className="w-7 h-7" />,
      title: "Trained Staff",
      description: "Professional caregivers trained in pet behavior, first aid, and play management."
    }
  ];

  const benefits = [
    "Full day of supervised play and activities",
    "Separate play areas for different dog sizes",
    "Indoor and outdoor play spaces",
    "Rest periods throughout the day",
    "Fresh water available at all times",
    "Healthy snacks and treats included",
    "Daily report card with photos",
    "Basic obedience reinforcement",
    "Nap time in comfortable rest areas",
    "Climate-controlled environment"
  ];

  const pricing = [
    {
      title: "Half Day",
      price: "$25",
      period: "session",
      features: [
        "Up to 4 hours",
        "Morning or afternoon",
        "Snack included",
        "Play activities"
      ]
    },
    {
      title: "Full Day",
      price: "$45",
      period: "day",
      features: [
        "Up to 10 hours",
        "All activities",
        "Lunch & snacks",
        "Rest periods"
      ]
    },
    {
      title: "5-Day Package",
      price: "$200",
      period: "week",
      features: [
        "Monday-Friday",
        "Save $25",
        "Priority booking",
        "All amenities"
      ]
    }
  ];

  return (
    <ServicePageLayout
      title="Daycare"
      subtitle="Services"
      description="Give your pet a day full of fun, friends, and activities! Our daycare program provides the perfect balance of playtime, socialization, and rest in a safe, supervised environment. Your pet will come home happy and tired after a day of adventure."
      heroImage="/images/services/daycare-card.jpg"
      features={features}
      benefits={benefits}
      pricing={pricing}
      ctaText="Book a Day"
    />
  );
} 