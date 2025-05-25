"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TestNavigationPage() {
  return (
    <main className="bg-white min-h-screen pt-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Test Navigation Page</h1>
        
        <p className="mb-8 text-gray-600">
          Click on the links below to test navigation to different sections on the home page:
        </p>
        
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h2 className="font-semibold mb-2">Section Links (with #)</h2>
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="outline">
                <Link href="/#services">Go to Services</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/#gallery">Go to Gallery</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/#about-us">Go to About Us</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/#checkin-info">Go to Contact</Link>
              </Button>
            </div>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h2 className="font-semibold mb-2">Direct Page Links</h2>
            <div className="flex flex-wrap gap-2">
              <Button asChild>
                <Link href="/">Home</Link>
              </Button>
              <Button asChild>
                <Link href="/blog">Blog</Link>
              </Button>
              <Button asChild>
                <Link href="/faq">FAQ</Link>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 p-4 bg-gray-100 rounded-lg">
          <p className="text-sm text-gray-600">
            <strong>How it should work:</strong><br/>
            • Clicking section links should navigate to home page and scroll to the specific section<br/>
            • The scroll should happen smoothly after the page loads<br/>
            • The navbar should not cover the section title
          </p>
        </div>
      </div>
    </main>
  );
} 