import type { NextConfig } from "next";
import { withContentCollections } from "@content-collections/next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "assets.aceternity.com" },
      { hostname: "images.unsplash.com" },
      { hostname: "img.youtube.com" },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Optimize for production
  poweredByHeader: false,
  compress: true,
  // Redirects for SEO
  async redirects() {
    return [
      {
        source: '/contact',
        destination: '/#checkin-info',
        permanent: true,
      },
      {
        source: '/contact-us',
        destination: '/#checkin-info',
        permanent: true,
      },
    ]
  },
};

export default withContentCollections(nextConfig);
