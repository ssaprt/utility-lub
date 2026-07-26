import { Documentation } from "@/components/Documentation/Documentation";
import { TransitionDropDown } from "@/content/react/UI-Components/Pagination/components/dropDown/TransitionDropDown/TransitionDropDown";

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
            className="!rounded-[14px]"
        >
            <Documentation
                titleEnd="App"
                code={`import { useImagePreview } from "use-image-preview";
import { useRef, useState, type DragEvent } from "react";

export const App = () => {
    const [isDragging, setIsDragging] = useState(false);
    const { file, preview, change, clear, type } = useImagePreview();

    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "copy";

        setIsDragging(true);
    };
    
    const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
        if (event.currentTarget.contains(event.relatedTarget as Node | null)) {
            return;
        }    
        setIsDragging(false);
    };

    useEffect(() => {
      if (!file) return;
      // ...send to server or something
    }, [file])

    return (
        <input
            type="file"
            accept="image/*"
            onChange={change}
            className="hidden"
        />
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={change}
        >
            {preview && (
                type === "image" ? 
                   <img
                    src={preview}
                    alt="preview"
                   /> 
                : 
                   <video
                       src={preview}
                       controls
                   />
            )}
            <button
                onClick={clear}
            >
                Clear
            </button>
        </div>
    )
};`}
            />
        </TransitionDropDown>
    );
};
