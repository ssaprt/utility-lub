import { IconCheck, IconCopy } from "@tabler/icons-react";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useEveryPaginationContext } from "../../content/react/UI-Components/Pagination/context/useEveryPagination";

export const Code = () => {
    const context = useEveryPaginationContext();
    const [copied, setCopied] = useState(false);

    const lines = [
        "<Pagination",
        `    selectTheme="${context?.selectTheme}"`,
        `    mode="${context?.mode || "horizontal"}"`,
        `    animationSpeed="${context?.animationSpeedValue || "300ms"}"`,
    ];

    if (context?.indexing) {
        lines.push(
            "    indexing={{",
            `        mode: "${context.indexing.mode}",`,
            `        key: "${context.indexing.key}",`,
            "    }}",
        );
    }

    lines.push(">", "    <YourComponentWithList />", "</Pagination>");

    const code = lines.join("\n");

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 1500);
    };

    return (
        <div className="relative flex flex-col min-w-0 flex-1 min-h-0">
            <button
                onClick={handleCopy}
                className="absolute top-3 right-3 z-10 flex items-center gap-2 rounded-md bg-zinc-700/70 hover:bg-zinc-700 px-3 py-1.5 text-sm text-white transition hover:cursor-pointer"
            >
                {copied ? (
                    <>
                        <IconCheck size={16} />
                        Copied
                    </>
                ) : (
                    <>
                        <IconCopy size={16} />
                        Copy
                    </>
                )}
            </button>

            <SyntaxHighlighter
                language="tsx"
                style={oneDark}
                showLineNumbers
                wrapLongLines
                customStyle={{
                    margin: 0,
                    height: "100%",
                    borderRadius: "12px",
                    fontSize: "14px",
                    lineHeight: "1.6",
                    fontFamily:
                        '"JetBrains Mono", "Fira Code", Consolas, monospace',
                    paddingTop: "60px",
                }}
                lineNumberStyle={{
                    color: "#666",
                    minWidth: "2.5em",
                    userSelect: "none",
                }}
                className="overflow-auto !rounded-2xl flex-1 min-h-0 shrink-0"
            >
                {code}
            </SyntaxHighlighter>
        </div>
    );
};
