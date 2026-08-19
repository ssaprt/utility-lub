import { config } from "./compiler.config";

export const compilerRoute = Array.from(config).map((item) => ({
    title: item.titleLink,
    path: [
        "css",
        "utils",
        "compiler",
        item.titleLink.replace(/\s+/g, "-").toLowerCase(),
    ],
}));
