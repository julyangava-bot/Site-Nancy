import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pink Dog Pet Resort | Premier Pet Care Services",
  description: "Pink Dog Pet Resort offers premium pet care services including grooming, daycare, and boarding in a safe and loving environment.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("antialiased", inter.className)} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
} 