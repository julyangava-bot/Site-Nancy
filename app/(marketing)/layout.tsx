import type { Metadata } from "next";
import "../globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Pink Dog Resort | Premier Pet Care",
  description:
    "Pink Dog Resort offers premium pet care services including grooming, daycare, and boarding in a safe and loving environment.",
};

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
