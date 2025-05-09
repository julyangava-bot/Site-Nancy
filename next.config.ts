import type { NextConfig } from "next";
import { withContentCollections } from "@content-collections/next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "assets.aceternity.com" },
      { hostname: "images.unsplash.com" },
      { hostname: "img.youtube.com" },
    ],
  },
};

export default withContentCollections(nextConfig);
