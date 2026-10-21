/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow images from placeholder services
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
};

module.exports = nextConfig;
