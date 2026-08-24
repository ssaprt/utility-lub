import { useState } from "react";
import { GeneralButton } from "../button/GeneralButton/GeneralButton";

export const Item = ({ item }: { item: string }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(item);

        setCopied(true);

        window.setTimeout(() => {
            setCopied(false);
        }, 1500);
    };
    return (
        <div
            className="row-stretch-2 justify-between p-2 pl-3 [&>span]:text-[14px]"
            key={item}
        >
            <span>{item}</span>
            <GeneralButton
                className="rounded-[8px]!"
                textButton="Copy"
                variant="aurora"
                handleAction={handleCopy}
                copy={{ copyItem: item }}
            />
        </div>
    );
};
