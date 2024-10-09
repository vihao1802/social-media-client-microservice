/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mui.com",
        port: "",
        pathname: "/static/images/**",
      },
    ],
  },
};

export default nextConfig;
