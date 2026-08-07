import { Documentation } from "@/components/Documentation/Documentation";
import { TransitionDropDown } from "@/content/react/UI-Components/Pagination/components/dropDown/TransitionDropDown/TransitionDropDown";

export const SelectAnimation = () => {
    return (
        <TransitionDropDown
            title="SELECT ANIMATION"
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
                code={`import { useState } from "react";
import { Popup } from "popup-from-future";
import "popup-from-future/style.css";

export const App = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <React.Fragment>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
            >
                Open popup
            </button>

            <Popup
               isOpen={isOpen}
               open={setIsOpen}
               animation={{
                   duration: 450,
                   easing: "ease-in-out",
                   open: {
                       animationName: "zoom-in",
                   },
                   close: {
                       animationName: "zoom-out",
                   },
               }}
            >
                Animated popup
            </Popup>
        </React.Fragment>
    );
};`}
            />
        </TransitionDropDown>
    );
};
