'use client'

import Link from 'next/link'
import Image from 'next/image'

export function AdminFooter() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white py-10 sm:py-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Left Side - Logo and Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <Image 
              src="/images/pinkdog_original_no_txt.png" 
              alt="PinkDog Logo" 
              width={32}
              height={32}
              className="opacity-75"
            />
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} PinkDog Pet Resort Admin. All rights reserved.
            </div>
          </div>
          
          {/* Right Side - Made with love and Powered by */}
          <div className="flex flex-col sm:flex-row items-center gap-0 sm:gap-8 text-center">
            <p className="text-sm text-gray-400 whitespace-nowrap">
              Made with <span className="text-red-500">❤️</span> for pet businesses
            </p>
            <Link
              href="https://petquantic.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-[#E73992] transition-colors whitespace-nowrap"
            >
              Powered by <span className="font-semibold text-[#E73992]">PetQuantic</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}