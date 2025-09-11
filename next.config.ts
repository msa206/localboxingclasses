import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.localboxingclasses.com' }],
        destination: 'https://localboxingclasses.com/:path*',
        permanent: true,
      },
    ];
  },
}

export default nextConfig