import { useGetCssSelectorQuery } from "@/services/CSSSelector/css-selector.api";
import { Code } from "./Code";
import { Result } from "./Result";
import { useCodeFieldContext } from "./providers/CodeFieldProvider";

export const ExampleFields = ({ name }: { name: string }) => {
    const { viewFields } = useCodeFieldContext();

    const { data } = useGetCssSelectorQuery({
        name,
    });

    return (
        <div className="grid w-full min-w-0 grid-cols-1 md:grid-cols-2 items-stretch gap-2 p-2 pb-1">
            <div className="relative min-w-0 h-full">
                {viewFields === "html" && (
                    <Code code={data?.example?.html || ""} language="html" />
                )}

                {viewFields === "css" && (
                    <Code code={data?.example?.css || ""} language="css" />
                )}

                {viewFields === "javascript" && (
                    <Code
                        code={data?.example?.javascript || ""}
                        language="javascript"
                    />
                )}
            </div>

            <div className="min-w-0 h-full">
                <Result name={name} />
            </div>
        </div>
    );
};
