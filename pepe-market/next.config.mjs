/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "avatars.githubusercontent.com",
            },
            {
                hostname: "avatars.githubusercontent.com",
            },
        ],
    },
    reactStrictMode: false,
};

export default nextConfig;
