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
      // Contact redirects
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
      // Old service URLs redirects
      {
        source: '/services/grooming',
        destination: '/grooming',
        permanent: true,
      },
      {
        source: '/services/pet-hotel',
        destination: '/pet-hotel',
        permanent: true,
      },
      {
        source: '/services/van-service',
        destination: '/van-service',
        permanent: true,
      },
      {
        source: '/services/daycare',
        destination: '/daycare',
        permanent: true,
      },
      // About page redirect
      {
        source: '/about-us',
        destination: '/about',
        permanent: true,
      },
      // Also handle /services/ base path
      {
        source: '/services/daycare',
        destination: '/daycare',
        permanent: true,
      },
      // Also handle /services/ base path
      {
        source: '/services',
        destination: '/',
        permanent: true,
      },
    ]
  },
};

export default withContentCollections(nextConfig);
