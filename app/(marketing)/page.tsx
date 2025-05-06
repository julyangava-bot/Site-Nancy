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
import { PawPrintsDecoration, WalkingPawPrints } from "@/components/pinkdog/paw-prints";

export default function Home() {
  return (
    <main className="bg-white relative">
      {/* Main content */}
      <div className="relative overflow-x-hidden">
        {/* Decorative paw prints throughout the page */}
        <PawPrintsDecoration count={8} />
        
        {/* Main sections */}
        <Hero />
        <Services />
        <Gallery />
        <div className="relative py-10">
          <WalkingPawPrints direction="right" className="h-20" />
        </div>
        <CheckInInfo />
        <div className="relative py-10">
          <WalkingPawPrints direction="left" className="h-20" />
        </div>
        <InstagramGallery />
        <AboutUs />
        <ScrollToTop />
      </div>
    </main>
  );
}
