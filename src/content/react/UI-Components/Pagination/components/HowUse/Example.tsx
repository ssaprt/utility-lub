import { Documentation } from "@/components/Documentation/Documentation";
import { TransitionDropDown } from "../dropDown/TransitionDropDown/TransitionDropDown";

export const Example = () => {
    return (
        <TransitionDropDown
            title="EXAMPLE"
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
            className="!rounded-[14px] !text-[min(2vw,16px)]"
        >
            <Documentation
                titleEnd="App"
                code={`import "@ssaprt/easy-pagination/style.css";
import { Pagination } from "@ssaprt/easy-pagination";
// import type { PresetsType } from "@ssaprt/easy-pagination";
    
export const App = () => {
/***
const yourTheme: PresetsType = {
        
}
*/
    return (
        <Pagination
            items={[1, 2, 3]} // required
            // selectTheme={yourTheme} // optional. You can choose from presets or custom. Default white
            // navigation="full" // optional("start" | "end" | "full"). Default full
            // mode="horizontal" // optional("vertical" | "horizontal"). Default horizontal
            // arrowStart={} // optional
            // arrowEnd={} // optional
            // itemsPerPage={10} // optional. Default 10
            // animationSpeed="300ms" // optional (\`\${number}ms\`). Default 600ms
            
             /*** optional
            theme={{
                Setup information is below  →
            }}
            */
        >
            <YourComponent />
        </Pagination>
    )
}
    
    
import { useList } from "@ssaprt/easy-pagination";
import { useProgress } from "@ssaprt/easy-pagination";
import { useEffect } from "react";

export const YourComponent = () => {
    const newList: yourType[] = useList();
    const { start, end, progress } = useProgress();

    const blur = start ? 12 : 0;

    useEffect(() => {
        const header = document.querySelector("#root") as HTMLDivElement;
        if (!header) return;

        header.style.left = \`0%\`;
        header.style.transition = "0s";
        header.style.opacity = "0.7";
        header.style.width = \`\${progress}%\`;

        if (progress === 100) {
            requestAnimationFrame(() => {
                header.style.transition = "opacity 1s linear";
                header.style.opacity = "0";
            });
        }
    }, [start, end, progress]);

    return (
        <div className="relative h-full w-full flex flex-1 items-center justify-center flex-wrap gap-1 overflow-y-auto p-2">
            <div
                className={\`
                    rounded-[24px] 
                    z-2 w-full 
                    h-full 
                    bg-transparent 
                    absolute 
                    left-0 
                    top-0 
                    backdrop-blur-[\${blur}px] 
                    transition-backdrop-filter 
                    duration-300 
                    ease-in-out\`
                }
            ></div>
            {newList.map((item, i) => (
                <span className="text-[30px] relative" key={i}>
                    {item}
                </span>
            ))}
        </div>
    );
};`}
            />
        </TransitionDropDown>
    );
};
