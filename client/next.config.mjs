import path from 'path';
import { fileURLToPath } from 'url';
import withBundleAnalyzer from '@next/bundle-analyzer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'assets.coingecko.com',
            },
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com',
            },
        ],
    },
    experimental: {
        optimizePackageImports: ['@rainbow-me/rainbowkit', '@solana/wallet-adapter-react', 'wagmi', 'lucide-react', 'react-icons', '@web3icons/react', 'framer-motion'],
    },
    turbopack: {
        resolveAlias: {
            ws: './empty-module.js',
        },
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

const bundleAnalyzer = withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
});

export default bundleAnalyzer(nextConfig);
