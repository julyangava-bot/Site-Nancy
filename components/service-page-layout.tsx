"use client";
import React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

interface ServicePageLayoutProps {
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  features: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }[];
  benefits: string[];
  pricing?: {
    title: string;
    price: string;
    period?: string;
    features: string[];
  }[];
  howItWorks?: string[];
  serviceArea?: {
    title: string;
    description: string;
  };
  faqItems?: {
    question: string;
    answer: string;
  }[];
  pricingNote?: string;
  ctaText?: string;
  ctaLink?: string;
  showSecondButton?: boolean;
}

export function ServicePageLayout({
  title,
  subtitle,
  description,
  heroImage,
  features,
  benefits,
  pricing,
  howItWorks,
  serviceArea,
  faqItems,
  pricingNote,
  ctaText = "Book Now",
  ctaLink = "/booking",
  showSecondButton = true,
}: ServicePageLayoutProps) {
  return (
    <main className="bg-white relative min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-30 sm:pt-36 pb-8 sm:pb-12">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF0F7] to-white"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {title} <span className="text-[#E73992]">{subtitle}</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                {description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="bg-[#E73992] text-white hover:bg-[#d3337f] rounded-full px-6 sm:px-8 py-3 sm:py-6 text-base sm:text-lg"
                  asChild
                >
                  <Link href={ctaLink}>{ctaText}</Link>
                </Button>
                {showSecondButton && (
                  <Button
                    variant="outline"
                    className="rounded-full px-6 sm:px-8 py-3 sm:py-6 text-base sm:text-lg border-[#E73992] text-[#E73992] hover:bg-[#FFF0F7]"
                    asChild
                  >
                    <Link href="/#checkin-info">Contact Us</Link>
                  </Button>
                )}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={heroImage}
                  alt={`${title} service`}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#FCD1E6] rounded-full opacity-50 blur-xl hidden sm:block"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#FFEBF5] rounded-full opacity-50 blur-xl hidden sm:block"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-[#FFF9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our <span className="text-[#E73992]">{title}</span>?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-14 h-14 bg-[#FCD1E6] rounded-xl flex items-center justify-center mb-4 text-[#E73992]">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">
                What&apos;s <span className="text-[#E73992]">Included</span>
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 bg-[#E73992] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-gray-700">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Image
                src="/images/pinkdog-happy-pets.jpg"
                alt="Happy pets at PinkDog"
                width={600}
                height={400}
                className="rounded-2xl shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      {howItWorks && howItWorks.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-white to-[#FFF9FC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                🐾 How It <span className="text-[#E73992]">Works</span>
              </h2>
            </motion.div>
            <div className="max-w-3xl mx-auto">
              <div className="space-y-4">
                {howItWorks.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-8 h-8 bg-[#E73992] rounded-full flex items-center justify-center flex-shrink-0 text-white font-semibold">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 text-lg">{step}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Service Area Section */}
      {serviceArea && (
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {serviceArea.title}
              </h2>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                {serviceArea.description}
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {faqItems && faqItems.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-[#FFF9FC] to-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                💬 Common <span className="text-[#E73992]">Questions</span>
              </h2>
            </motion.div>
            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 shadow-lg"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Q: {item.question}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    A: {item.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pricing Section (Optional) */}
      {pricing && pricing.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-[#FFF9FC] to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our <span className="text-[#E73992]">Pricing</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {pricing.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.title}
                  </h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-[#E73992]">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-gray-600 ml-2">/{plan.period}</span>
                    )}
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-[#E73992] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full bg-[#E73992] text-white hover:bg-[#d3337f] rounded-full"
                    asChild
                  >
                    <Link href={ctaLink}>Select Plan</Link>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}



      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#E73992] to-[#FF69B4] relative">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Give Your Pet the Best Care?
            </h2>
            <p className="text-base sm:text-xl text-white/90 mb-6 sm:mb-8">
              {pricingNote || "Book your pet's appointment today and see why PinkDog is the preferred choice for pet parents."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-[#E73992] hover:bg-gray-100 rounded-full px-8 py-6 text-lg font-semibold"
                asChild
              >
                <Link href={ctaLink}>{ctaText}</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white/10 rounded-full px-8 py-6 text-lg font-semibold"
                asChild
              >
                <Link href="/faq">Have Questions?</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
} 