import { Documentation } from "@/components/Documentation/Documentation";
import { TransitionDropDown } from "../dropDown/TransitionDropDown/TransitionDropDown";

export const Indexing = () => {
    return (
        <TransitionDropDown
            title="INDEXING"
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
