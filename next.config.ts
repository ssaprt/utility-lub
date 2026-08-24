import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    output: process.env.NODE_ENV === "production" ? "export" : undefined,
    devIndicators: false,
    trailingSlash: true,

    allowedDevOrigins: [
        "192.168.100.8",
        "192.168.100.8:3000",
        "192.168.100.4",
        "192.168.100.4:3000",
    ],

    typescript: {
        ignoreBuildErrors: true,
    },

    experimental: {
        externalDir: true,
    },

    turbopack: {
        rules: {
            "*.svg": {
                loaders: ["@svgr/webpack"],
                as: "*.js",
            },
        },
    },
};

export default nextConfig;
