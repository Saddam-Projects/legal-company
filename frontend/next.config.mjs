/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8080',
                pathname: '/**',
            },
        ],
    },
    reactStrictMode: true,
    cleanDistDir: true,
    compress: true,
};

export default nextConfig;
