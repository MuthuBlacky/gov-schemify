/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ['mongoose']
  },
  reactStrictMode: true,
  images: {
    domains: ['utfs.io', 'img.clerk.com','picsum.photos'],
  },
}

export default nextConfig
