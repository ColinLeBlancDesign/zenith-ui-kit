/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Build the local workspace package from source.
  transpilePackages: ["zenith-ui"],
};

export default nextConfig;
