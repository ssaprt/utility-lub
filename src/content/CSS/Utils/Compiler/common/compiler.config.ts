import { UniversalCSSCompilerTypeApiList } from "../types/compiler.types";

const compilers: UniversalCSSCompilerTypeApiList[] = [
    {
        titleLink: "CSS-SCSS Compiler",
        requestNameFunction: "useCssToScssMutation",
        placeholder:
            ".wrapper {\n\tcolor: red;\n\tpadding: 16px;\n}\n\n.wrapper .inner {\n\tcolor: blue;\n}",
        actionButtonText: "Convert to SCSS",
        language: "css",
    },
    {
        titleLink: "SCSS-CSS Compiler",
        requestNameFunction: "useScssToCssMutation",
        placeholder:
            "$primary: red;\n\n.wrapper {\n\tcolor: $primary;\n\n\t.inner {\n\t\tcolor: blue;\n\t}\n}",
        actionButtonText: "Convert to CSS",
        language: "scss",
    },
    {
        titleLink: "CSS-LESS Compiler",
        requestNameFunction: "useCssToLessMutation",
        placeholder:
            ".wrapper {\n\tcolor: red;\n\tpadding: 16px;\n}\n\n.wrapper .inner {\n\tcolor: blue;\n}",
        actionButtonText: "Convert to LESS",
        language: "css",
    },
    {
        titleLink: "LESS-CSS Compiler",
        requestNameFunction: "useLessToCssMutation",
        placeholder:
            "@primary: red;\n\n.wrapper {\n\tcolor: @primary;\n\n\t.inner {\n\t\tcolor: blue;\n\t}\n}",
        actionButtonText: "Convert to CSS",
        language: "less",
    },
];
const converters: UniversalCSSCompilerTypeApiList[] = [
    {
        titleLink: "Convert to Nested SCSS",
        requestNameFunction: "useCssToNestedScssMutation",
        placeholder:
            ".card {\n\tpadding: 20px;\n}\n\n.card .title {\n\tcolor: red;\n}\n\n.card .title span {\n\tfont-weight: 600;\n}\n\n.card:hover {\n\tbackground: black;\n}\n\n.card.active {\n\topacity: 1;\n}",
        actionButtonText: "Convert to Nested SCSS",
        language: "css",
    },
    {
        titleLink: "Convert to Nested LESS",
        requestNameFunction: "useCssToNestedLessMutation",
        placeholder:
            ".card {\n\tpadding: 20px;\n}\n\n.card .title {\n\tcolor: red;\n}\n\n.card .title span {\n\tfont-weight: 600;\n}\n\n.card:hover {\n\tbackground: black;\n}\n\n.card.active {\n\topacity: 1;\n}",
        actionButtonText: "Convert to Nested LESS",
        language: "css",
    },
    {
        titleLink: "Convert to SCSS Variables",
        requestNameFunction: "useCssToScssVariablesMutation",
        placeholder:
            ".header {\n\tcolor: #8b5cf6;\n\tpadding: 16px;\n}\n\n.button {\n\tcolor: #8b5cf6;\n\tpadding: 16px;\n}\n\n.footer {\n\tbackground: #8b5cf6;\n}",
        actionButtonText: "Create SCSS Variables",
        language: "css",
    },
    {
        titleLink: "Convert to LESS Variables",
        requestNameFunction: "useCssToLessVariablesMutation",
        placeholder:
            ".header {\n\tcolor: #8b5cf6;\n\tpadding: 16px;\n}\n\n.button {\n\tcolor: #8b5cf6;\n\tpadding: 16px;\n}\n\n.footer {\n\tbackground: #8b5cf6;\n}",
        actionButtonText: "Create LESS Variables",
        language: "css",
    },
];

const formatters: UniversalCSSCompilerTypeApiList[] = [
    {
        titleLink: "Format CSS",
        requestNameFunction: "useFormatCssMutation",
        placeholder:
            ".wrapper{color:red;padding:16px 24px}.inner{color:blue;margin:0}",
        actionButtonText: "Format CSS",
        language: "css",
    },
    {
        titleLink: "Format SCSS",
        requestNameFunction: "useFormatScssMutation",
        placeholder:
            "$primary:red;.wrapper{color:$primary;.inner{color:blue;&:hover{color:green}}}",
        actionButtonText: "Format SCSS",
        language: "scss",
    },
    {
        titleLink: "Format LESS",
        requestNameFunction: "useFormatLessMutation",
        placeholder:
            "@primary:red;.wrapper{color:@primary;.inner{color:blue;&:hover{color:green}}}",
        actionButtonText: "Format LESS",
        language: "less",
    },
];
const minifiers: UniversalCSSCompilerTypeApiList[] = [
    {
        titleLink: "Minify CSS",
        requestNameFunction: "useMinifyCssMutation",
        placeholder:
            ".wrapper {\n\tcolor: red;\n\tpadding: 16px 24px;\n}\n\n.inner {\n\tcolor: blue;\n\tmargin: 0px;\n}",
        actionButtonText: "Minify CSS",
        language: "css",
    },
];
const validators: UniversalCSSCompilerTypeApiList[] = [
    {
        titleLink: "Validate CSS",
        requestNameFunction: "useValidateStylesMutation",
        placeholder:
            ".wrapper {\n\tcolor: red;\n\tpadding: 16px;\n}\n\n.wrapper:hover {\n\tcolor: blue;\n}",
        actionButtonText: "Validate CSS",
        language: "css",
    },
    {
        titleLink: "Validate SCSS",
        requestNameFunction: "useValidateStylesMutation",
        placeholder:
            "$primary: #8b5cf6;\n\n.wrapper {\n\tcolor: $primary;\n\n\t.inner {\n\t\tpadding: 16px;\n\n\t\t&:hover {\n\t\t\tcolor: red;\n\t\t}\n\t}\n}",
        actionButtonText: "Validate SCSS",
        language: "scss",
    },
    {
        titleLink: "Validate LESS",
        requestNameFunction: "useValidateStylesMutation",
        placeholder:
            "@primary: #8b5cf6;\n\n.wrapper {\n\tcolor: @primary;\n\n\t.inner {\n\t\tpadding: 16px;\n\n\t\t&:hover {\n\t\t\tcolor: red;\n\t\t}\n\t}\n}",
        actionButtonText: "Validate LESS",
        language: "less",
    },
];

const optimizes: UniversalCSSCompilerTypeApiList[] = [
    {
        titleLink: "Optimize CSS",
        requestNameFunction: "useOptimizeMutation",
        placeholder:
            ".button {\n\tcolor: #ffffff;\n\tmargin: 0px 0px 0px 0px;\n\tpadding: 10px 10px 10px 10px;\n\tfont-weight: normal;\n}\n\n.button:hover {\n\tcolor: #ffffff;\n}",
        actionButtonText: "Optimize CSS",
        language: "css",
    },
];
const autoprefixers: UniversalCSSCompilerTypeApiList[] = [
    {
        titleLink: "Autoprefix CSS",
        requestNameFunction: "useAutoprefixMutation",
        placeholder:
            ".element {\n\tdisplay: flex;\n\tuser-select: none;\n\tappearance: none;\n\tbackdrop-filter: blur(10px);\n}",
        actionButtonText: "Add Vendor Prefixes",
        language: "css",
    },
    {
        titleLink: "Remove Autoprefix CSS",
        requestNameFunction: "useRemovePrefixesMutation",
        placeholder:
            ".element {\n\t-webkit-user-select: none;\n\t-moz-user-select: none;\n\tuser-select: none;\n\t-webkit-appearance: none;\n\tappearance: none;\n}",
        actionButtonText: "Remove Vendor Prefixes",
        language: "css",
    },
];

export const config: Record<string, UniversalCSSCompilerTypeApiList[]> = {
    compilers,
    converters,
    minifiers,
    validators,
    optimizes,
    autoprefixers,
    formatters,
};
