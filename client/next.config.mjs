/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        optimizePackageImports: ['@rainbow-me/rainbowkit', '@solana/wallet-adapter-react', 'wagmi'],
        isrMemoryCacheSize: 0, // Disable memory cache for ISR
    },
    webpack: (config) => {
        config.cache = {
            type: 'filesystem',
            buildDependencies: {
                config: [__filename],
            },
        };
        return config;
    },
    // Enable React strict mode for better error detection
    reactStrictMode: true,
    // Optimize for production
    swcMinify: true,
    onDemandEntries: {
        maxInactiveAge: 15 * 1000, // 15 seconds
        pagesBufferLength: 5,
    },
};

export default nextConfig;
