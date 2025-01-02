import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['placehold.co'], // Add any domains you're using for images
  },
}


/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],  // Only needed for external images
  },
}

module.exports = nextConfig


