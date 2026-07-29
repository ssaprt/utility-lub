import { Documentation } from "@/components/Documentation/Documentation";
import { TransitionDropDown } from "@/content/react/UI-Components/Pagination/components/dropDown/TransitionDropDown/TransitionDropDown";

export const GlobalConfiguration = () => {
    return (
        <TransitionDropDown
            title="GLOBAL CONFIGURATION"
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
