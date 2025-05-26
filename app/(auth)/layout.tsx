import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "PinkDog Pet Resort | Authentication",
  description: "Login or sign up to access PinkDog Pet Resort's premium pet care services.",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
