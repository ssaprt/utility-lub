import babelPlugin from "prettier/plugins/babel";
import estreePlugin from "prettier/plugins/estree";
import htmlPlugin from "prettier/plugins/html";
import postcssPlugin from "prettier/plugins/postcss";
import prettier from "prettier/standalone";

export const formatExampleCode = async (code: string, language: string) => {
    if (!code.trim()) return "";

    try {
        if (language === "html") {
            return await prettier.format(code, {
                parser: "html",
                plugins: [htmlPlugin],
                tabWidth: 4,
                printWidth: 80,
            });
        }

        if (language === "css") {
            return await prettier.format(code, {
                parser: "css",
                plugins: [postcssPlugin],
                tabWidth: 4,
                printWidth: 80,
            });
        }

        if (language === "javascript" || language === "js") {
            return await prettier.format(code, {
                parser: "babel",
                plugins: [babelPlugin, estreePlugin],
                tabWidth: 4,
                printWidth: 80,
            });
        }

        return code;
    } catch {
        return code;
    }
};
