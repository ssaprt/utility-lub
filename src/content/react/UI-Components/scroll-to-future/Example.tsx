import { Documentation } from "@/components/Documentation/Documentation";
import { TransitionDropDown } from "@/content/react/UI-Components/Pagination/components/dropDown/TransitionDropDown/TransitionDropDown";

export const Example = () => {
    return (
        <TransitionDropDown title="EXAMPLE" className="!rounded-[14px]">
            <Documentation
                titleEnd="App"
                code={`import { ScrollToFuture } from "scroll-to-future";
import "scroll-to-future/style.css";

export const App = () => {
    return (
        <div {/* scroll block **/}>
            <ScrollToFuture />
        </div>
    )
};`}
            />
        </TransitionDropDown>
    );
};
