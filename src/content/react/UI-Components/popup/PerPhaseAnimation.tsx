import { Documentation } from "@/components/Documentation/Documentation";
import { TransitionDropDown } from "@/content/react/UI-Components/Pagination/components/dropDown/TransitionDropDown/TransitionDropDown";

export const PerPhaseAnimation = () => {
    return (
        <TransitionDropDown
            title="PER-PHASE ANIMATION"
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
