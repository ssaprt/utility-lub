import {
    compilerGroup,
    compilerRoute,
} from "@/content/CSS/Utils/Compiler/common/compiler-generate-route";
import { UniversalCSSCompiler } from "@/content/CSS/Utils/Compiler/UniversalCSSCompiler";

const compilerGroupRoute = compilerGroup.map((group) => ({
    title: group.title,
    path: ["css", "utils", group.titlePath],
    Component: () => null,
}));

const compilerPageRoute = compilerRoute.map((route) => ({
    ...route,
    Component: UniversalCSSCompiler,
}));

export const cssCompilerRoute = [...compilerGroupRoute, ...compilerPageRoute];
