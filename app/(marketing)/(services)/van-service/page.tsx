import React from "react";
import { ServicePageLayout } from "@/components/service-page-layout";
import { Car, Shield, Heart, Clock, MapPin, Phone } from "lucide-react";

export default function VanServicePage() {
  const features = [
    {
      icon: <Car className="w-7 h-7" />,
      title: "Comfortable Vehicles",
      description: "Climate-controlled vans equipped with secure crates and non-slip surfaces."
    },
    {
      icon: <Shield className="w-7 h-7" />,
      title: "Safety First",
      description: "All pets are safely secured during transport with appropriate restraints."
    },
    {
      icon: <Heart className="w-7 h-7" />,
      title: "Experienced Drivers",
      description: "Our drivers are pet lovers trained in safe pet handling and transport."
    },
    {
      icon: <Clock className="w-7 h-7" />,
      title: "Punctual Service",
      description: "We respect your time with on-time pickups and drop-offs."
    },
    {
      icon: <MapPin className="w-7 h-7" />,
      title: "Door-to-Door",
      description: "Convenient pickup from your home and safe return after services."
    },
    {
      icon: <Phone className="w-7 h-7" />,
      title: "Real-Time Updates",
      description: "Receive notifications when we pick up and drop off your pet."
    }
  ];

  const benefits = [
    "Insured and licensed transport service",
    "Individual crates for each pet",
    "Fresh water available during transport",
    "Maximum 30-minute travel time",
    "GPS tracking on all vehicles",
    "First aid kit on board",
    "Regular vehicle sanitization",
    "Comfort stops for longer trips",
    "Special care for anxious travelers",
    "Multiple pet discounts available"
  ];

  const pricing = [
    {
      title: "One-Way Trip",
      price: "$15",
      period: "per trip",
      features: [
        "Within 5 miles",
        "Single pet",
        "Door-to-door",
        "Insured transport"
      ]
    },
    {
      title: "Round Trip",
      price: "$25",
      period: "same day",
      features: [
        "Within 5 miles",
        "Single pet",
        "Morning pickup",
        "Evening return"
      ]
    },
    {
      title: "Weekly Package",
      price: "$100",
      period: "5 round trips",
      features: [
        "Save $25",
        "Flexible scheduling",
        "Priority booking",
        "Multiple pets OK"
      ]
    }
  ];

  return (
    <ServicePageLayout
      title="Van"
      subtitle="Service"
      description="Let us handle the transportation! Our safe and comfortable pet transport service takes the stress out of getting your furry friend to and from our facility. Our specially equipped vans and caring drivers ensure a smooth, safe journey every time."
      heroImage="/images/services/van-card.jpg"
      features={features}
      benefits={benefits}
      pricing={pricing}
      ctaText="Schedule Transport"
    />
  );
} 