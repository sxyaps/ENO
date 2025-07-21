/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
    unoptimized: true
  },
  output: 'export',
  trailingSlash: true,
  // Skip building API routes for static export
  skipTrailingSlashRedirect: true,
  // Skip middleware for static export
  skipMiddlewareUrlNormalize: true
}

module.exports = nextConfig
