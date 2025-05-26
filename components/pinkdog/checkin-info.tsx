"use client";
import React from "react";
import { motion } from "framer-motion";
import { IconBrandWhatsapp } from "@tabler/icons-react";


// Hours data
const hours = [
  { day: "Monday - Saturday", hours: "08:30 AM - 05:00 PM" },
  { day: "Sunday", hours: "03:00 PM - 05:00 PM" },
];

// Contact info
const contactInfo = {
  phone: "+1 978-772-4242",
  whatsapp: "954-914-0128",
  email: "email@email.com",
  address: "259 Ayer Rd, Harvard, MA 01451, US",
  instagram: "pinkdogspa",
};

export function CheckInInfo() {
  return (
    <section id="checkin-info" className="py-20 bg-[#FDF2F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#FCD1E6] opacity-20 rounded-bl-full"></div>
          <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-[#FCD1E6] opacity-20 rounded-tr-full"></div>
          <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-[#E73992] opacity-20 rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/3 w-6 h-6 bg-[#E73992] opacity-10 rounded-full"></div>

          <div className="relative p-8 md:p-12 lg:p-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Contact <span className="text-[#E73992]">Information</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Everything you need to know to reach us and make your pet&apos;s
                visit easy and stress-free
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
              {/* Operating Hours */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-[#FFEBF5] rounded-2xl p-6 md:p-8"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-7 w-7 text-[#E73992]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                  Business Hours
                </h3>

                <div className="space-y-4">
                  {hours.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center border-b border-pink-200 pb-3"
                    >
                      <span className="font-medium text-gray-800">
                        {item.day}
                      </span>
                      <span className="text-[#E73992] font-semibold">
                        {item.hours}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 bg-white rounded-xl p-4 shadow-sm">
                  <p className="text-gray-600 text-sm">
                    <span className="font-semibold text-[#E73992]">Note:</span>{" "}
                    We recommend arriving 15 minutes before your scheduled
                    appointment to complete check-in procedures.
                  </p>
                </div>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-white border-2 border-[#FCD1E6] rounded-2xl p-6 md:p-8"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-7 w-7 text-[#E73992]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </span>
                  Contact Us
                </h3>

                <div className="space-y-5">
                  <div className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-[#E73992] mt-0.5 mr-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <div>
                      <h4 className="font-medium text-gray-700">Phone</h4>
                      <a
                        href="tel:+19787724242"
                        className="text-[#E73992] font-semibold hover:underline"
                      >
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <IconBrandWhatsapp className="h-6 w-6 text-[#E73992] mt-0.5 mr-3" />
                    <div>
                      <h4 className="font-medium text-gray-700">Text/WhatsApp</h4>
                      <a
                        href={`sms:${contactInfo.whatsapp}`}
                        className="text-[#E73992] font-semibold hover:underline"
                      >
                        {contactInfo.whatsapp}
                      </a>
                    </div>
                  </div>

                  {/* <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#E73992] mt-0.5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <h4 className="font-medium text-gray-700">Email</h4>
                      <a href="mailto:pinkdogpetresort@gmail.com" className="text-[#E73992] font-semibold hover:underline">{contactInfo.email}</a>
                    </div>
                  </div> */}

                  <div className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-[#E73992] mt-0.5 mr-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <div>
                      <h4 className="font-medium text-gray-700">Address</h4>
                      <a
                        href="https://maps.google.com/?q=259+Ayer+Rd,+Harvard,+MA+01451,+US"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-800 hover:text-[#E73992] hover:underline"
                      >
                        {contactInfo.address}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-[#E73992] mt-0.5 mr-3"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="2"
                        y="2"
                        width="20"
                        height="20"
                        rx="5"
                        ry="5"
                      ></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                    <div>
                      <h4 className="font-medium text-gray-700">Instagram</h4>
                      <a
                        href={`https://instagram.com/${contactInfo.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#E73992] font-semibold hover:underline"
                      >
                        @{contactInfo.instagram}
                      </a>
                    </div>
                  </div>
                </div>

                {/* <div className="mt-8 flex justify-center">
                  <Button
                    className="bg-[#E73992] text-white hover:bg-[#d3337f] rounded-full px-8 py-2.5"
                    asChild
                  >
                    <Link href="/contact">Contact Us Now</Link>
                  </Button>
                </div> */}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              className="mt-12 text-center"
            ></motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
