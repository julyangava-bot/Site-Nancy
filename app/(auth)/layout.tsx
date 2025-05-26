import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Pink Dog Pet Resort | Authentication",
  description: "Login or sign up to access Pink Dog Pet Resort's premium pet care services.",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
