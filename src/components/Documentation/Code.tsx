import { useEveryPaginationContext } from "@/content/react/UI-Components/Pagination/context/useEveryPagination";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export const Code = () => {
    const context = useEveryPaginationContext();

    return (
        <SyntaxHighlighter
            language="tsx"
            style={oneDark}
            showLineNumbers
            wrapLongLines
            customStyle={{
                width: "100%",
                minWidth: 0,
                height: "100%",
                margin: 0,
                borderRadius: "1em",
                lineHeight: 1.6,
                fontSize: "inherit",
                fontFamily:
                    '"JetBrains Mono", "Fira Code", Consolas, monospace',
            }}
            lineNumberStyle={{
                minWidth: "2.5em",
                paddingRight: "1em",
                color: "#666",
                fontSize: "0.9em",
                userSelect: "none",
            }}
            className="
                z-[1]
                min-h-0
                min-w-0
                flex-1
                overflow-auto
                !rounded-[1em]
                !px-[1em]
                !py-[1em]
            "
        >
            {context?.install?.code ?? ""}
        </SyntaxHighlighter>
    );
};
