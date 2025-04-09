/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React Strict Mode for better development experience
  reactStrictMode: true,
  
  // Optimize hot-reload performance
  webpack: (config, { dev, isServer }) => {
    // Keep cache between builds in development
    if (dev && !isServer) {
      config.cache = true;
    }
    return config;
  },

  // Configure Supabase rewrites for local development
  async rewrites() {
    return [
      {
        source: '/api/supabase/:path*',
        destination: 'http://127.0.0.1:54321/:path*',
      },
    ];
  },
}

module.exports = nextConfig 