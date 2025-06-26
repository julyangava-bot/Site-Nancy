import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#FFF7FB] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 with paw prints */}
        <div className="relative mb-8">
          <h1 className="text-9xl font-bold text-[#E73992] opacity-20">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/images/paw-print.svg"
              alt="Paw print"
              width={96}
              height={96}
              className="opacity-30"
            />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Oops! Page Not Found
        </h2>
        
        <p className="text-lg text-gray-600 mb-8">
          It looks like this page went for a walk and didn&apos;t come back! 
          Don&apos;t worry, we&apos;ll help you find your way.
        </p>
        
        <div className="space-y-4">
          <Button
            className="bg-[#E73992] text-white hover:bg-[#d3337f] rounded-full px-8 py-3 text-lg font-medium"
            asChild
          >
            <Link href="/">Go to Homepage</Link>
          </Button>
          
          <div className="text-gray-600">
            <p className="mb-2">Were you looking for one of these?</p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <Link href="/pet-hotel" className="text-[#E73992] hover:underline">
                Pet Hotel
              </Link>
              <span className="text-gray-400">•</span>
              <Link href="/daycare" className="text-[#E73992] hover:underline">
                Daycare
              </Link>
              <span className="text-gray-400">•</span>
              <Link href="/grooming" className="text-[#E73992] hover:underline">
                Grooming
              </Link>
              <span className="text-gray-400">•</span>
              <Link href="/van-service" className="text-[#E73992] hover:underline">
                Van Service
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-gray-500 text-sm">
          If you believe this is an error, please{" "}
          <Link href="/#checkin-info" className="text-[#E73992] hover:underline">
            contact us
          </Link>
        </div>
      </div>
    </div>
  );
} 