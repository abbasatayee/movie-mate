/** @type {import('next').NextConfig} */
const nextConfig = {
  // Temporarily disable static export to allow API routes during development
  // output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
