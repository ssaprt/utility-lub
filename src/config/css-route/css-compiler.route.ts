import { compilerRoute } from "@/content/CSS/Utils/Compiler/common/compiler-generate-route";
import { UniversalCSSCompiler } from "@/content/CSS/Utils/Compiler/UniversalCSSCompiler";

export const cssCompilerRoute = [
    {
        title: "CSS Compiler",
        path: ["css", "utils", "compiler"],
        Component: () => null,
    },
    ...compilerRoute.map((route) => ({
        ...route,
        Component: UniversalCSSCompiler,
    })),
];
