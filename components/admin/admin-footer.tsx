'use client'

import Link from 'next/link'
import Image from 'next/image'

export function AdminFooter() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Left Side - Logo and Copyright */}
          <div className="flex items-center gap-3">
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
          
          {/* Powered By Section */}
          <div className="group flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-pink-50 via-purple-50 to-pink-50 rounded-full border border-pink-200 hover:border-pink-300 hover:shadow-lg transition-all duration-300 cursor-pointer">
            <p className="text-xs text-gray-600 font-medium">
              Made with <span className="text-red-500">❤️</span> for pet businesses
            </p>
            <span className="text-gray-400">•</span>
            <Link
              href="https://petquantic.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent hover:from-pink-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-1"
            >
              Powered by PetQuantic
              <svg className="w-3 h-3 text-pink-600 group-hover:translate-x-0.5 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}