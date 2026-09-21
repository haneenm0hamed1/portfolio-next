import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    // TODO: add real image domains when using external URLs
  },

  // Transpile three.js ecosystem for App Router compatibility
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
};

export default nextConfig;
