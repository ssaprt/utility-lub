import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
import { ExampleFields } from "./ExampleFields";
import { ToggleViewCode } from "./ToggleViewCode";

export const ExampleSelector = ({ name }: { name: string }) => {
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
                 w-full
                 [&_*]:overflow-hidden
                 [&_*]:text-ellipsis
                 [&_*]:whitespace-nowrap"
            >
                <div className="row-center-2 overflow-visible">
                    <h3 className="text-xs text-fg/90 ml-2">Example</h3>
                    <ToggleViewCode name={name} />
                </div>
                <GeneralButton
                    textButton="Copy CSS"
                    variant="frame"
                    className="rounded-[8px]!"
                    copy={{ copyItem: name }}
                />
            </div>
            <ExampleFields name={name} />
        </div>
    );
};
