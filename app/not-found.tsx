import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#FFF0F7] to-white">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-[#E73992] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <Button
          className="bg-[#E73992] text-white hover:bg-[#d3337f] rounded-full px-8 py-6"
          asChild
        >
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    </div>
  );
} 