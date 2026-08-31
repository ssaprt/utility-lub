import { config } from "./compiler.config";

export const createPathSegment = (value: string) => {
    return value
        .trim()
        .toLowerCase()
        .replace(/[()]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
};

export const compilerGroup = [
    {
        titlePath: "compiler",
        title: "CSS Compiler",
        icon: "compiler.svg",
        routes: config.compilers,
    },
    {
        titlePath: "converter",
        title: "CSS Converters",
        icon: "converter.svg",
        routes: config.converters,
    },
    {
        titlePath: "optimizer",
        title: "CSS Optimizers",
        icon: "optimization.svg",
        routes: config.optimizes,
    },
    {
        titlePath: "autoprefixer",
        title: "CSS Autoprefixers",
        icon: "autoprefixer.svg",
        routes: config.autoprefixers,
    },
    {
        titlePath: "minifier",
        title: "CSS Minifiers",
        icon: "minifier.svg",
        routes: config.minifiers,
    },
    {
        titlePath: "formatter",
        title: "CSS Formatters",
        icon: "formatter.svg",
        routes: config.formatters,
    },
    {
        titlePath: "validator",
        title: "CSS Validators",
        icon: "validator.svg",
        routes: config.validators,
    },
];

export const compilerRoute = compilerGroup.flatMap((group) =>
    group.routes.map((route) => ({
        title: route.titleLink,
        path: [
            "css",
            "utils",
            group.titlePath,
            createPathSegment(route.titleLink),
        ],
    })),
);
