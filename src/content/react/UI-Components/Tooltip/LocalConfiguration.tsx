import { Documentation } from "@/components/Documentation/Documentation";
import { TransitionDropDown } from "@/content/react/UI-Components/Pagination/components/dropDown/TransitionDropDown/TransitionDropDown";

export const LocalConfiguration = () => {
    return (
        <TransitionDropDown
            title="LOCAL CONFIGURATION"
            className="!rounded-[14px]"
        >
            <Documentation
                titleEnd="App"
                code={`<Tooltip
    content="Saved successfully || <Component /> || Any html code"
    position="bottom"
    selectTheme="dark"
    animation={{
        show: "bounce",
        hide: "fade",
        speed: "180ms",
        easing: "ease-out",
    }}
    hideDelay={200}
>
    <button type="button">Save</button>
</Tooltip>`}
            />
        </TransitionDropDown>
    );
};
