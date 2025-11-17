/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        optimizePackageImports: ['@rainbow-me/rainbowkit', '@solana/wallet-adapter-react', 'wagmi']
    },
    webpack: (config) => {
        config.cache = true;
        return config;
    },
    // Enable React strict mode for better error detection
    reactStrictMode: true,
};

export default nextConfig;
