/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable experimental features for better performance
    experimental: {
        optimizeCss: true,
        optimizePackageImports: ['lucide-react', 'framer-motion'],
    },

    // Optimize images
    images: {
        formats: ['image/webp', 'image/avif'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },

    // Enable compression
    compress: true,

    // Turbopack configuration
    turbopack: {
        rules: {
            '*.svg': {
                loaders: ['@svgr/webpack'],
                as: '*.js',
            },
        },
    },

    // Optimize output
    output: 'standalone',

    // Enable static optimization
    trailingSlash: false,
}

module.exports = nextConfig
