/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires

module.exports = {
  reactStrictMode: true,
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  // images: {
  //   domains: ['robohash.org', 'fakestoreapi.com'],
  //   loader: 'default',
  //   path: '/_next/image',
  //   deviceSizes: [480, 768, 1440, 1920],
  //   formats: ['image/webp'],
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};
