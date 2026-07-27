import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    output: "export",
    devIndicators: false,
    trailingSlash: true,

    allowedDevOrigins: ["192.168.100.4", "192.168.100.4:3000"],

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
