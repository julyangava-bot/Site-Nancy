import type { Metadata } from "next";
import { Inter, Urbanist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
});

const urbanist = Urbanist({ 
  subsets: ["latin"],
  variable: "--font-urbanist"
});

export const metadata: Metadata = {
  title: "PinkDog Pet Resort | Premier Pet Care Services",
  description: "PinkDog Pet Resort offers premium pet care services including grooming, daycare, and boarding in a safe and loving environment.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("antialiased", inter.className, urbanist.variable)} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
} 