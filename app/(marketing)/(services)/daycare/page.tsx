import React from "react";
import { ServicePageLayout } from "@/components/service-page-layout";
import { Heart, Home, Gamepad2, Sparkles, Trees, Car } from "lucide-react";

export default function DaycarePage() {
  const features = [
    {
      icon: <Home className="w-7 h-7" />,
      title: "🐶 Luxury Suites",
      description: "Climate-controlled, plush bedding, and peaceful rest for dogs and cats."
    },
    {
      icon: <Gamepad2 className="w-7 h-7" />,
      title: "🎾 Enrichment & Play",
      description: "Group and individual activities tailored by size and temperament."
    },
    {
      icon: <Sparkles className="w-7 h-7" />,
      title: "🧼 Spa & Wellness",
      description: "Grooming, relaxation, and care to keep your pet feeling their best."
    },
    {
      icon: <Trees className="w-7 h-7" />,
      title: "🏞 Spacious Outdoor Yards",
      description: "Secure play spaces designed for fun, freedom, and fresh air."
    },
    {
      icon: <Heart className="w-7 h-7" />,
      title: "❤ Loving, Skilled Staff",
      description: "Passionate caregivers who treat your pet like one of their own."
    },
    {
      icon: <Car className="w-7 h-7" />,
      title: "🚐 PinkVan Services",
      description: "Available pick-up and drop-off transportation for your convenience."
    }
  ];

  const benefits = [
    "🐾 Physical Exercise - Active play helps maintain healthy weight and heart health",
    "🐾 Socialization Skills - Daily interaction strengthens social behavior",
    "🐾 Mental Stimulation - New experiences keep your dog's mind sharp",
    "🐾 Emotional Well-Being - Positive group play lifts mood and reduces stress",
    "🐾 Better Behavior at Home - Learning communication develops confidence",
    "🐾 Stronger Immune System - Regular movement and joy support overall health",
    "Large, secure indoor & outdoor play spaces",
    "Climate-controlled environment for year-round comfort",
    "Small group sizes for individualized care",
    "Clean, sanitized facility with structured routines",
    "Easy drop-off and pick-up with ample parking"
  ];

  const whyChooseDaycare = [
    "Physical Exercise - Active play helps your dog maintain a healthy weight, stay agile, and support heart health",
    "Socialization Skills - Daily interaction with other dogs strengthens social behavior, reducing anxiety and reactivity over time", 
    "Mental Stimulation - New experiences, toys, games, and playmates keep your dog's mind sharp and prevent boredom-driven behaviors",
    "Emotional Well-Being - Dogs are pack animals, and positive group play can lift their mood, ease separation anxiety, and reduce stress",
    "Better Behavior at Home - Learning canine communication helps your dog develop manners and confidence both in and out of daycare",
    "Stronger Immune System - Just like humans, dogs benefit from regular movement, stimulation, and joy to support overall health"
  ];



  return (
    <ServicePageLayout
      title="Daycare"
      subtitle="Services"
      description="Nurturing Pets, Strengthening Bonds, and Celebrating Happiness—The PinkDog Way. At PinkDog Pet Resort, our daycare program offers more than just supervision—it provides a vibrant, enriching experience designed to support your dog's physical, mental, and emotional health. With spacious indoor and outdoor climate-controlled play areas, our facility is the perfect environment for dogs to run, play, and engage with others in a safe and structured setting."
      heroImage="/images/services/daycare-card.jpg"
      features={features}
      benefits={benefits}
      howItWorks={whyChooseDaycare}
      serviceArea={{
        title: "✨ Designed for Joy & Peace of Mind",
        description: "Our experienced and caring staff supervises all play sessions to ensure safety, encourage appropriate behavior, and provide lots of love and attention throughout the day. Whether your pup is high-energy or prefers gentle play, we tailor group activities based on temperament and size to ensure every dog feels comfortable and included."
      }}
      ctaText="Schedule Your Pup's Playdate"
      ctaLink="https://booking.appointy.com/en-US/pinkdogresort/bookings/service"
    />
  );
} 