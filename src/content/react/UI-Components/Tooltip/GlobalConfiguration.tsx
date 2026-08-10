import { Documentation } from "@/components/Documentation/Documentation";
import { TransitionDropDown } from "@/content/react/UI-Components/Pagination/components/dropDown/TransitionDropDown/TransitionDropDown";

export const GlobalConfiguration = () => {
    return (
        <TransitionDropDown
            title="GLOBAL CONFIGURATION"
            className="!rounded-[14px]"
        >
            <Documentation
                titleEnd="App"
                code={`import { TooltipProvider } from "@ssaprt/tooltip";
import "@ssaprt/tooltip/style.css";

export const AppProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <TooltipProvider
            defaultRenderPosition="top"
            selectTheme="glass"
            animation={{
                show: "slide",
                hide: "fade",
                speed: "140ms",
                easing: "ease-in-out",
            }}
        >
            {children}
        </TooltipProvider>
    );
};`}
            />
        </TransitionDropDown>
    );
};
