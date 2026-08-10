import { Documentation } from "@/components/Documentation/Documentation";
import { TransitionDropDown } from "@/content/react/UI-Components/Pagination/components/dropDown/TransitionDropDown/TransitionDropDown";

export const Example = () => {
    return (
        <TransitionDropDown title="EXAMPLE" className="!rounded-[14px]">
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
