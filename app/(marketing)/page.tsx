import React from "react";
import { Hero } from "@/components/hero";
import { Services, CheckInInfo, Gallery, AboutUs, ScrollToTop } from "@/components/pinkdog";

export default function Home() {
  return (
    <main className="bg-white [&>section]:scroll-mt-24">
      <Hero />
      <Services />
      <Gallery />
      <CheckInInfo />
      <AboutUs />
      <ScrollToTop />
    </main>
  );
}
