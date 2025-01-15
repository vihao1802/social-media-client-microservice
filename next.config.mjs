/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mui.com',
        port: '',
        pathname: '/static/images/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // Add custom webpack rules here
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[hash].[ext]',
          publicPath: `/_next/static/videos/`,
          outputPath: `${isServer ? '../' : ''}static/videos/`,
        },
      },
    });

    return config;
  },
};

export default nextConfig;
