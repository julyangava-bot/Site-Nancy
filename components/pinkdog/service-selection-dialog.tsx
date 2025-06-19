"use client"

import React from "react"
import { X } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

interface ServiceSelectionDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function ServiceSelectionDialog({ isOpen, onClose }: ServiceSelectionDialogProps) {
  const router = useRouter()

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const services = [
    {
      id: "pet-hotel",
      title: "Pet Hotel",
      description: "Comfortable overnight stays in our luxury suites",
      icon: "/images/icons/pethotel-icon.png",
      emoji: "🏨",
      features: ["24/7 Supervision", "Climate Control", "Daily Updates"],
      color: "from-[#FFD6E8] to-[#FFE9F3]",
      borderColor: "hover:border-[#FFC4DE]",
      iconBg: "from-[#FFF0F7] to-[#FFE4F1]",
      action: () => {
        router.push("/pet-hotel?booking=true")
        onClose()
      }
    },
    {
      id: "daycare",
      title: "Daycare",
      description: "Socialization and playtime with furry friends",
      icon: "/images/icons/daycare-icon.png",
      emoji: "🎾",
      features: ["Group Play", "Indoor/Outdoor", "All Day Fun"],
      color: "from-[#FFE4F1] to-[#FFF0F7]",
      borderColor: "hover:border-[#FFD4E9]",
      iconBg: "from-[#FFF5FA] to-[#FFEBF5]",
      action: () => {
        router.push("/daycare?booking=true")
        onClose()
      }
    },
    {
      id: "grooming",
      title: "Grooming & Spa",
      description: "Professional grooming and pampering services",
      icon: "/images/icons/grooming-icon.png",
      emoji: "✨",
      features: ["Full Groom", "Bath & Brush", "Nail Trim"],
      color: "from-[#FFB5D5] to-[#FCD1E6]",
      borderColor: "hover:border-[#FF9EC8]",
      iconBg: "from-[#FFF0F7] to-[#FFE9F3]",
      action: () => {
        router.push("/grooming?booking=true")
        onClose()
      }
    },
    {
      id: "van-service",
      title: "PinkVan Service",
      description: "Door-to-door pet transportation",
      icon: "/images/icons/van-icon.png",
      emoji: "🚐",
      features: ["Pick-up", "Drop-off", "Safe Travel"],
      color: "from-[#FFEBF5] to-[#FFF5FA]",
      borderColor: "hover:border-[#FFDBED]",
      iconBg: "from-[#FFF5FA] to-[#FFF9FC]",
      action: () => {
        router.push("/van-service?booking=true")
        onClose()
      }
    }
  ]

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm"
            onClick={handleBackdropClick}
          />
          
          {/* Dialog Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
            onClick={handleBackdropClick}
          >
            <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
              {/* Decorative gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E73992] via-[#FF69B4] to-[#FFB5D5]" />
              
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute right-3 top-3 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-all z-10 group"
                aria-label="Close dialog"
              >
                <X className="h-4 w-4 text-gray-500 group-hover:text-gray-700" />
              </button>

              {/* Content */}
              <div className="p-4 sm:p-6">
                {/* Header with mascot */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-6"
                >
                  <div className="bg-gradient-to-r from-[#FFF0F7] via-[#FFE9F3] to-[#FFF5FA] rounded-xl p-4 sm:p-5 border border-[#FFD6E8]/30">
                    <div className="flex items-center gap-3 sm:gap-4">
                      {/* Mascot image */}
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", duration: 0.6, delay: 0.2 }}
                        className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0"
                      >
                        <Image
                          src="/images/pinkdog-logo-3d.png"
                          alt="PinkDog 3D Logo"
                          fill
                          className="object-contain drop-shadow-lg"
                        />
                      </motion.div>
                      
                      {/* Text content */}
                      <div className="flex-1 text-left">
                        <h2 className="text-xl sm:text-2xl font-bold mb-0.5">
                          <span className="text-gray-900">Choose Your </span>
                          <span className="text-[#E73992]">Service</span>
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-600">
                          Select the perfect care for your furry friend
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {services.map((service, index) => (
                    <motion.button
                      key={service.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + index * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={service.action}
                      className={`relative bg-white rounded-xl p-4 text-left transition-all duration-300 hover:shadow-xl ${service.borderColor} border-2 border-gray-100 group overflow-hidden`}
                    >
                      {/* Background gradient on hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                      
                      <div className="relative z-10 flex items-center gap-3">
                        {/* Icon with gradient background */}
                        <div className={`w-14 h-14 bg-gradient-to-br ${service.iconBg} rounded-xl p-2.5 shadow-md flex-shrink-0 group-hover:shadow-lg transition-shadow`}>
                          <Image
                            src={service.icon}
                            alt={service.title}
                            width={36}
                            height={36}
                            className="object-contain"
                          />
                        </div>
                        
                        {/* Text and features */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 text-base mb-0.5 group-hover:text-gray-800">
                            {service.title}
                          </h3>
                          <p className="text-xs text-gray-600 line-clamp-1 mb-2 group-hover:text-gray-700">
                            {service.description}
                          </p>
                          {/* Mini features on desktop */}
                          <div className="hidden sm:flex flex-wrap gap-1">
                            {service.features.slice(0, 2).map((feature, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full group-hover:bg-white/50"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        {/* Arrow indicator */}
                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-50 group-hover:bg-white/80 transition-all">
                          <svg className="w-4 h-4 text-gray-400 group-hover:text-[#E73992] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Footer */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-center text-xs text-gray-500 mt-6"
                >
                  Need help? Call us at <a href="tel:978-772-4242" className="text-[#E73992] hover:underline font-medium">978-772-4242</a>
                </motion.p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}