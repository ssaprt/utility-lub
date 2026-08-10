import { Documentation } from "@/components/Documentation/Documentation";
import { TransitionDropDown } from "../dropDown/TransitionDropDown/TransitionDropDown";

export const Indexing = () => {
    return (
        <TransitionDropDown title="INDEXING" className="!rounded-[14px]">
            <Documentation
                titleEnd="App"
                code={`import "@ssaprt/easy-pagination/style.css";
import { Pagination } from "@ssaprt/easy-pagination";

export const App = () => {

    return (
        <Pagination
            items={[1, 2, 3]} // required
            indexing= {{ mode: "url", key: "yourKeyName" }} // optional. Default state don't have indexing
        >
            <YourComponent />
        </Pagination>
    )
};`}
            />
        </TransitionDropDown>
    );
};
