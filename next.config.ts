import { type NextConfig } from 'next'

const config: NextConfig = {
  output: 'standalone',
  experimental: {
    serverMinification: false
  },
  // Ensure Next.js binds to all network interfaces
  hostname: '0.0.0.0',
  port: 3000,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default config
