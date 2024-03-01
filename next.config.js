// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '62.60.210.125',
        port: '3003'
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard/users',
        permanent: true
      },
      {
        source: '/auth',
        destination: '/auth/login',
        permanent: true
      },
      {
        source: '/dashboard',
        destination: '/dashboard/users',
        permanent: true
      }
    ];
  },
  output: 'standalone'
};

module.exports = nextConfig;
