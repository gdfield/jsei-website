/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The Laboratories index was renamed Scientists (2026-10-22). Individual lab
  // pages stay at /laboratories/<slug>; only the index moves.
  async redirects() {
    return [{ source: '/laboratories', destination: '/scientists', permanent: true }];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
}

module.exports = nextConfig
