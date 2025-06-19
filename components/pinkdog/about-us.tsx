"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IconBrandInstagram, IconBrandFacebook } from "@tabler/icons-react";
import { ServiceSelectionDialog } from "@/components/pinkdog/service-selection-dialog";

// Features list
const features = [
  "24/7 supervision by trained professionals",
  "Spacious play areas for socialization",
  "Custom meal plans based on dietary needs",
  "Regular health checks and monitoring",
  "Climate-controlled comfort",
  "Photo and video updates available upon request",
];

export function AboutUs() {
  const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false);
  return (
    <>
    <section
      id="about-us"
      className="py-20 bg-[#FDF2F8] relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-[#FCD1E6] opacity-20"></div>
      <div className="absolute top-1/3 right-10 w-4 h-4 rounded-full bg-[#E73992] opacity-40"></div>
      <div className="absolute bottom-10 left-1/4 w-8 h-8 rounded-full bg-[#E73992] opacity-20"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About <span className="text-[#E73992]">PinkDog Pet Resort</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our dedicated team and premium facilities make us the perfect home
            away from home for your pets
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Our Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h3>
            <div className="space-y-4 text-gray-600">
              <p>
                PinkDog Pet Resort began with a simple idea: create a place
                where pets feel as loved and cared for as they do at home.
                Founded in 2015, we&apos;ve grown from a small grooming salon to
                a full-service pet care facility.
              </p>
              <p>
                What sets us apart is our genuine love for animals and
                commitment to their wellbeing. Every member of our team is
                trained in pet first aid and behavior management, ensuring your
                furry family members receive the best care possible.
              </p>
              <p>
                We believe that pets deserve vacation-quality care, which is why
                we&apos;ve designed our facility to be both functional and fun,
                with separate areas for different activities and temperaments.
              </p>
            </div>

            <div className="mt-8">
              <h4 className="font-semibold text-gray-900 mb-3">
                What Makes Us Special:
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="mr-2 text-[#E73992]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <Button
                className="bg-[#E73992] text-white hover:bg-[#d3337f] rounded-full px-6 py-3 inline-flex items-center gap-2 transition-all duration-300 hover:shadow-lg"
                asChild
              >
                <Link href="/about">
                  Learn More About Us
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Facility Video */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden shadow-xl"
          >
            <video
              src="/images/pingdog-animate.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="object-contain w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 pointer-events-none">
              <p className="text-white text-lg font-medium">
                Your trusted local pet care family in Harvard, MA
              </p>
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center bg-white rounded-2xl p-8 md:p-12 shadow-lg relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#FCD1E6] opacity-20 rounded-bl-full"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#FCD1E6] opacity-20 rounded-tr-full"></div>

          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 relative z-10">
            Ready to Give Your Pet the Best Care?
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8 relative z-10">
            Book a tour of our facility or schedule your pet&apos;s first stay
            with us. We can&apos;t wait to meet your furry family member!
          </p>

          {/* Social Media Links */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-8 relative z-10">
            <Link
              href="https://instagram.com/pinkdogspa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E73992] "
            >
              <div className="flex flex-col items-center bg-[#FDF2F8] p-4 rounded-lg">
                <IconBrandInstagram size={36} className="text-[#E73992] mb-2" />
                <h4 className="font-semibold text-gray-900 mb-1">Instagram</h4>
                @pinkdogspa
              </div>
            </Link>

            <Link
              href="https://facebook.com/pinkdogspa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#3b5998]"
            >
              <div className="flex flex-col items-center bg-[#F0F6FF] p-4 rounded-lg">
                <IconBrandFacebook size={36} className="text-[#3b5998] mb-2" />
                <h4 className="font-semibold text-gray-900 mb-1">Facebook</h4>
                @pinkdogspa
              </div>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <Button
              className="bg-[#E73992] text-white hover:bg-[#d3337f] rounded-full px-8 py-6 h-auto"
              onClick={() => setIsServiceDialogOpen(true)}
            >
              Reserve Spot
            </Button>
            <Button
              className="bg-white text-[#E73992] border-2 border-[#E73992] hover:bg-[#FCD1E6] hover:text-[#E73992] hover:border-[#E73992] rounded-full px-8 py-6 h-auto"
              asChild
            >
              <Link href="/#checkin-info">Contact Us</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
    
    <ServiceSelectionDialog 
      isOpen={isServiceDialogOpen} 
      onClose={() => setIsServiceDialogOpen(false)} 
    />
    </>
  );
}
