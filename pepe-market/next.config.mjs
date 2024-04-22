/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "avatars.githubusercontent.com",
            },
            {
                hostname: "imagedelivery.net",
            },
        ],
    },
    reactStrictMode: false,
};

export default nextConfig;
