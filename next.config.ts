import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'p1r7j2dwef.ufs.sh',
      },
      {
        protocol: 'https',
        hostname: 'assets.navdeepsingh.dev',
      },
    ],
  },
}

export default nextConfig
