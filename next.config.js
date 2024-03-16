// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'esapp.ir'
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
