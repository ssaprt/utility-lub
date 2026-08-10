import { Documentation } from "@/components/Documentation/Documentation";
import { TransitionDropDown } from "@/content/react/UI-Components/Pagination/components/dropDown/TransitionDropDown/TransitionDropDown";

export const ImportantInfo = () => {
    return (
        <TransitionDropDown title="IMPORTANT INFO" className="!rounded-[14px]">
            <Documentation
                titleEnd="App"
                code={`import "popup-from-future/style.css";
                    
const App = () => { ... }`}
            />
        </TransitionDropDown>
    );
};
