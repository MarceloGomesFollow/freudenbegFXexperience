
import type {NextConfig} from 'next';

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  basePath: isProd ? '/freudenbegFXexperience' : '',
  assetPrefix: isProd ? '/freudenbegFXexperience/' : '',
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { dev }) => {
    // Avoid intermittent Windows filesystem-cache corruption in dev
    // (e.g. missing vendor chunks like @opentelemetry after failed pack rename).
    if (dev && process.platform === 'win32') {
      config.cache = { type: 'memory' };
    }
    return config;
  },
};

export default nextConfig;
