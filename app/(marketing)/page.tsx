import React from "react";
import { Hero } from "@/components/hero";
import { 
  Services, 
  CheckInInfo, 
  Gallery, 
  AboutUs, 
  ScrollToTop, 
  InstagramGallery
} from "@/components/pinkdog";

export default function Home() {
  return (
    <main className="bg-white relative">
      {/* Main content */}
      <div className="relative overflow-x-hidden">
        {/* Main sections */}
        <Hero />
        <Services />
        <Gallery />
        
        {/* Simple spacing div */}
        <div className="py-10"></div>
        
        <CheckInInfo />
        
        {/* Simple spacing div */}
        <div className="py-10"></div>
        
        <InstagramGallery />
        <AboutUs />
        <ScrollToTop />
      </div>
    </main>
  );
}
