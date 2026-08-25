import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
import { useGetCssSelectorQuery } from "@/services/CSSSelector/css-selector.api";
import { ExampleFields } from "./ExampleFields";
import { ToggleViewCode } from "./ToggleViewCode";
import { useCodeFieldContext } from "./providers/CodeFieldProvider";

export const ExampleSelector = ({ name }: { name: string }) => {
    const { viewFields } = useCodeFieldContext();

    const { data } = useGetCssSelectorQuery({
        name,
    });

    const copyData = {
        html: {
            label: "HTML",
            value: data?.example?.html || "",
        },
        css: {
            label: "CSS",
            value: data?.example?.css || "",
        },
        javascript: {
            label: "JS",
            value: data?.example?.javascript || "",
        },
    }[viewFields];

    return (
        <div className="default-block-0">
            <div
                className="
                    row-center-1
                    justify-between
                    w-full
                    p-2
                    bg-fg/10
                    rounded-y-md
                    [&_*]:overflow-hidden
                    [&_*]:text-ellipsis
                    [&_*]:whitespace-nowrap
                "
            >
                <div className="row-center-2 overflow-visible">
                    <h3 className="text-xs text-fg/90 ml-2">Example</h3>

                    <ToggleViewCode name={name} />
                </div>

                <GeneralButton
                    textButton={`Copy ${copyData.label}`}
                    variant="frame"
                    className="rounded-[8px]!"
                    copy={{
                        copyItem: copyData.value,
                    }}
                />
            </div>

            <ExampleFields name={name} />
        </div>
    );
};
