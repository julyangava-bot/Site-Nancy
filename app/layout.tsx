import type { Metadata } from "next";
import { Inter, Urbanist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SchemaMarkup } from "@/components/schema-markup";
import { Providers } from "@/context/providers";
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
});

const urbanist = Urbanist({ 
  subsets: ["latin"],
  variable: "--font-urbanist"
});

export const metadata: Metadata = {
  metadataBase: new URL('https://pinkdogpetresort.com'),
  title: {
    default: "PinkDog Pet Resort | Pet Hotel, Daycare & Grooming Harvard MA",
    template: "%s | PinkDog Pet Resort"
  },
  description: "Premium pet care services in Harvard, MA. 24/7 pet hotel, daycare, grooming & transport. Trusted since 2015. Book your pet's stay today! ☎ (978) 772-4242",
  keywords: ["pet hotel Harvard MA", "dog boarding", "pet daycare", "dog grooming", "pet resort", "cat boarding", "pet care services", "dog spa", "pet transportation", "PinkDog Pet Resort"],
  authors: [{ name: "PinkDog Pet Resort" }],
  creator: "PinkDog Pet Resort",
  publisher: "PinkDog Pet Resort",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://pinkdogpetresort.com",
  },
  other: {
    "contact:phone_number": "(978) 772-4242",
    "contact:country_name": "United States",
    "contact:region": "Massachusetts",
    "contact:postal_code": "01451",
    "geo.region": "US-MA",
    "geo.placename": "Harvard",
    "geo.position": "42.4973;-71.5811",
    "ICBM": "42.4973, -71.5811",
  },
  openGraph: {
    title: "PinkDog Pet Resort - Premium Pet Care in Harvard, MA",
    description: "Where pets feel at home! 24/7 pet hotel, daycare & grooming services. Professional care, spacious play areas & personalized attention. Book now!",
    url: "https://pinkdogpetresort.com",
    siteName: "PinkDog Pet Resort",
    images: [
      {
        url: "/images/pinkdogresort-metada.png",
        width: 1200,
        height: 630,
        alt: "PinkDog Pet Resort - Your Pet's Favorite Place",
        type: "image/png",
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PinkDog Pet Resort - Premium Pet Care in Harvard, MA",
    description: "Where pets feel at home! 24/7 pet hotel, daycare & grooming services. Book now!",
    site: "@pinkdogspa",
    creator: "@pinkdogspa",
    images: ["/images/pinkdogresort-metada.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "add-your-google-verification-code", // Add your Google Search Console verification
    // yandex: "add-your-yandex-verification-code",
    // bing: "add-your-bing-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <SchemaMarkup />
        <link rel="canonical" href="https://pinkdogpetresort.com" />
      </head>
      <body className={cn("antialiased", inter.className, urbanist.variable)} suppressHydrationWarning>
        <Analytics />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
} 