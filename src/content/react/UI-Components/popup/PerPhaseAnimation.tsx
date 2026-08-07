import { Documentation } from "@/components/Documentation/Documentation";
import { TransitionDropDown } from "@/content/react/UI-Components/Pagination/components/dropDown/TransitionDropDown/TransitionDropDown";

export const PerPhaseAnimation = () => {
    return (
        <TransitionDropDown
            title="PER-PHASE ANIMATION"
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
                code={`<Popup
    isOpen={isOpen}
    open={setIsOpen}
    animation={{
        open: {
            animationName: "bounce-in",
            duration: 700,
            easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        },
        close: {
            animationName: "fade-out",
            duration: 300,
            easing: "ease-out",
        },
    }}
>
    Content
</Popup>`}
            />
        </TransitionDropDown>
    );
};
