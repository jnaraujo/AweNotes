module.exports = {
  target: "experimental-serverless-trace",
  swcMinify: true,
  generateBuildId: () => 'build',
  experimental: {
    styledComponents: true,
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
}