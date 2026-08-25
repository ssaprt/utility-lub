import { Scroll } from "@/layouts/primary/Scroll";
import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { syntaxTheme } from "./code-theme";
import { formatExampleCode } from "./formatExampleCode";

export const Code = ({
    code,
    language,
}: {
    code: string;
    language: string;
}) => {
    const [formattedCode, setFormattedCode] = useState(code);

    useEffect(() => {
        let active = true;

        formatExampleCode(code, language).then((result) => {
            if (active) {
                setFormattedCode(result);
            }
        });

        return () => {
            active = false;
        };
    }, [code, language]);

    return (
        <div className="relative w-full min-w-0 overflow-auto! rounded-md! bg-fg/5 h-full max-h-[400px]">
            <SyntaxHighlighter
                language={language}
                style={syntaxTheme}
                showLineNumbers
                customStyle={{
                    width: "max-content",
                    minWidth: "100%",
                    margin: 0,
                    padding: "12px",
                    boxSizing: "border-box",
                    overflow: "visible",
                    background: "transparent",
                    whiteSpace: "pre",
                    fontSize: "12px",
                }}
                codeTagProps={{
                    style: {
                        whiteSpace: "pre",
                    },
                }}
                lineNumberStyle={{
                    minWidth: "2.5em",
                    paddingRight: "1em",
                    fontSize: "10px",
                    userSelect: "none",
                }}
            >
                {formattedCode}
            </SyntaxHighlighter>

            <Scroll
                heightTrack="90%"
                scrollWidth="6px"
                boundaryOffset="0px 6px"
                imposition="over"
            />
        </div>
    );
};
