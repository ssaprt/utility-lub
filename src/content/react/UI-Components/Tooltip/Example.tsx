import { Documentation } from "@/components/Documentation/Documentation";
import { TransitionDropDown } from "@/content/react/UI-Components/Pagination/components/dropDown/TransitionDropDown/TransitionDropDown";

export const Example = () => {
    return (
        <TransitionDropDown title="EXAMPLE" className="!rounded-[14px]">
            <Documentation
                titleEnd="App"
                code={`import { Tooltip } from "@ssaprt/tooltip";
import "@ssaprt/tooltip/style.css";

export const Example = () => {
    return (
        <Tooltip content="Copy value">
            <button type="button">Copy</button>
        </Tooltip>
    );
};`}
            />
        </TransitionDropDown>
    );
};
