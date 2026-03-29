import path from 'path';
import { fileURLToPath } from 'url';
import withBundleAnalyzer from '@next/bundle-analyzer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        optimizePackageImports: ['@rainbow-me/rainbowkit', '@solana/wallet-adapter-react', 'wagmi', 'lucide-react', 'react-icons', '@web3icons/react', 'framer-motion'],
    },

    // ✅ ADD THIS BLOCK
 images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "raw.githubusercontent.com",
    },
    {
      protocol: "https",
      hostname: "assets.coingecko.com", // ✅ ADD THIS
    },
  ],
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

    reactStrictMode: true,

    onDemandEntries: {
        maxInactiveAge: 15 * 1000,
        pagesBufferLength: 5,
    },
};

const bundleAnalyzer = withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
});


export default bundleAnalyzer(nextConfig);