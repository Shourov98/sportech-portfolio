/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // allow Cloudinary images
      },
      {
        protocol: "https",
        hostname: "example.com", // remove this later, was just placeholder in API docs
      },
    ],
  },
};

export default nextConfig;
