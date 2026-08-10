import { Documentation } from "@/components/Documentation/Documentation";
import { TransitionDropDown } from "@/content/react/UI-Components/Pagination/components/dropDown/TransitionDropDown/TransitionDropDown";

export const Example = () => {
    return (
        <TransitionDropDown title="EXAMPLE" className="!rounded-[14px]">
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
            >
                <h2>Hello</h2>
                <p>Popup content</p>
            </Popup>
        </React.Fragment>
    );
};`}
            />
        </TransitionDropDown>
    );
};
