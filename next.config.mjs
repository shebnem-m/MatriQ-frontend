/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "privoz43.ru",
      },
    ],
  },
};

export default nextConfig;