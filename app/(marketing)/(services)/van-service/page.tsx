import React from "react";
import { ServicePageLayout } from "@/components/service-page-layout";
import { VanBookingForm } from "@/components/pinkdog/van-booking-form";
import { Car, Clock, MapPin, MessageCircle, Calendar, Heart } from "lucide-react";

export default function VanServicePage() {
  const features = [
    {
      icon: <Calendar className="w-7 h-7" />,
      title: "Morning Pick-ups & Afternoon Drop-offs",
      description: "Convenient scheduling for grooming, daycare, and overnight hotel stays."
    },
    {
      icon: <Car className="w-7 h-7" />,
      title: "Safe & Comfortable Transport",
      description: "Climate-controlled van with secure kennels for your pet's safety."
    },
    {
      icon: <Heart className="w-7 h-7" />,
      title: "Professional Handlers",
      description: "Trained staff in safe pet transportation who care for your furry friends."
    },
    {
      icon: <MessageCircle className="w-7 h-7" />,
      title: "Real-Time Updates",
      description: "Text or WhatsApp updates available upon request for peace of mind."
    },
    {
      icon: <MapPin className="w-7 h-7" />,
      title: "Local Service Area",
      description: "Located in Harvard, MA, serving nearby towns off Route 2."
    },
    {
      icon: <Clock className="w-7 h-7" />,
      title: "Convenient Time Windows",
      description: "Morning pickups 8:00 AM - 10:00 AM, afternoon drop-offs after 3:00 PM."
    }
  ];

  const benefits = [
    "No time to drive? No problem!",
    "Safe and reliable pet transportation",
    "Stress-free drop-offs and pickups",
    "Climate-controlled vehicle",
    "Secure kennels for safe transport",
    "Professional handlers trained in pet safety",
    "Text or WhatsApp updates available",
    "Service for grooming, daycare, and hotel stays",
    "Morning and afternoon service windows",
    "Advance notice appreciated"
  ];

  const howItWorks = [
    "Morning Pick-Ups & Afternoon Drop-Offs",
    "Available for grooming, daycare, and overnight hotel stays",
    "Safe, climate-controlled van with secure kennels",
    "Professional handlers trained in safe pet transportation",
    "Text or WhatsApp updates available upon request"
  ];

  const faqItems = [
    {
      question: "How do I schedule the PinkVan?",
      answer: "Please call us to schedule PinkVan service, or text us directly to request availability. Advance notice is appreciated!"
    },
    {
      question: "Is there an extra fee for the van service?",
      answer: "Yes, there is a small transportation fee based on your distance from our resort. We'll give you a quote before confirming."
    },
    {
      question: "What time will you arrive?",
      answer: "Morning pick-up windows generally start between 8:00 AM – 10:00 AM, and drop-offs begin after 3:00 PM. We'll confirm your exact timing in advance."
    }
  ];

  return (
    <ServicePageLayout
      title="PinkVan"
      subtitle="Service"
      description="No time to drive? No problem! Let PinkVan, our safe and reliable pet transportation service, bring the spa and daycare experience to your doorstep. Whether you're at work, juggling a busy schedule, or simply want convenience, PinkVan takes the stress out of drop-offs and pickups. We'll make sure your furry friend gets to and from PinkDog Pet Resort safely, comfortably, and right on time."
      heroImage="/images/services/van-card.jpg"
      features={features}
      benefits={benefits}
      howItWorks={howItWorks}
      serviceArea={{
        title: "📍 Service Area",
        description: "We are located in Harvard, MA, right off Route 2, and our PinkVan services extend to several nearby towns. Contact us to check if we serve your location!"
      }}
      faqItems={faqItems}
      pricingNote="Van service rate by distance - appointment only. Please contact us by phone for a personalized quote."
              customCTA={<VanBookingForm>Book PinkVan</VanBookingForm>}
        customCTAButton={<VanBookingForm variant="cta">Book PinkVan</VanBookingForm>}
        showSecondButton={true}
        secondButtonText="Have Questions?"
        videoUrl="https://youtube.com/shorts/cDyqllECsoc"
        ctaText="Request PinkVan Service"
        ctaLink="/"
    />
  );
} 