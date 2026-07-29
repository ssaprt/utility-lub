import { Documentation } from "@/components/Documentation/Documentation";
import { TransitionDropDown } from "@/content/react/UI-Components/Pagination/components/dropDown/TransitionDropDown/TransitionDropDown";

export const LocalConfiguration = () => {
    return (
        <TransitionDropDown
            title="LOCAL CONFIGURATION"
            style={{
                "--bgPrimaryContainer": "rgb(40, 44, 52)",
                "--bgPrimaryContainerShow": "rgb(40, 44, 52)",
                "--bgTitleBlock": "rgb(40, 44, 52)",
                "--colorTitleBlock": "#fda5d6",
                "--colorTitleBlockShow": "#ba749b",
                "--BoxShadowTitleBlock": "none",
                "--BoxShadowTitleBlockShow": "none",
                "--fillTitleBlockIcon": "#fda5d6",
                "--fillTitleBlockIconShow": "#ba749b",
            }}
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
