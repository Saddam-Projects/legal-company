/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '127.0.0.1',
                port: '8000',
                pathname: '/**',
            },
        ],
    },
    reactStrictMode: true,
    cleanDistDir: true,
    compress: true,
};

export default nextConfig;
