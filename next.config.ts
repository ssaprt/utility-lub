import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    output: "export",
    devIndicators: false,
    trailingSlash: true,

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
