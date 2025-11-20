import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL('https://i.imgur.com/**'),
      new URL('https://m.media-amazon.com/images/I/**'),
      new URL('https://placehold.co/**'),
    ],
  },
};

export default nextConfig;
