import React from "react";
import { Hero } from "@/components/hero";
import { 
  Services, 
  CheckInInfo, 
  Gallery, 
  AboutUs, 
  ScrollToTop, 
  InstitutionalVideo,
  Testimonials
} from "@/components/pinkdog";

export default function Home() {
  return (
    <main className="bg-white relative">
      {/* Main content */}
      <div className="relative overflow-x-hidden">
        {/* Main sections */}
        <Hero />
        <InstitutionalVideo />
        <Services />
        <Testimonials />
        <Gallery />
        
        {/* Simple spacing div */}
        <div className="py-10"></div>
        
        <CheckInInfo />
        <AboutUs />
        <ScrollToTop />
      </div>
    </main>
  );
}
