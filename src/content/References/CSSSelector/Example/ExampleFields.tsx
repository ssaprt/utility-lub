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
        <div className="grid w-full min-w-0 grid-cols-1 md:grid-cols-2 items-stretch gap-2 p-2 pb-2 pb-1">
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

            <div className="flex min-w-0 h-full flex-col overflow-hidden rounded-md bg-fg/5">
                <div className="w-full px-3 py-2">
                    <span className="text-[10px] font-medium text-fg/80">
                        Result
                    </span>
                </div>

                <div className="min-h-0 flex-1">
                    <Result name={name} />
                </div>
            </div>
        </div>
    );
};
