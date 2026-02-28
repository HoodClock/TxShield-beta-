/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        optimizePackageImports: ['@rainbow-me/rainbowkit', '@solana/wallet-adapter-react', 'wagmi', 'lucide-react', 'react-icons', '@web3icons/react', 'framer-motion'],
    },
    webpack: (config, { webpack }) => {
        config.cache = {
            type: 'filesystem',
        };
        config.resolve.fallback = {
            ...config.resolve.fallback,
            ws: false,
        };
        config.plugins.push(
            new webpack.IgnorePlugin({
                resourceRegExp: /^ws$/,
            })
        );
        return config;
    },
    // Enable React strict mode for better error detection
    reactStrictMode: true,
    onDemandEntries: {
        maxInactiveAge: 15 * 1000, // 15 seconds
        pagesBufferLength: 5,
    },
};

export default nextConfig;
