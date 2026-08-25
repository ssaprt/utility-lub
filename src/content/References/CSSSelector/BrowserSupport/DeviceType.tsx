import { BrowserSupport } from "@/services/CSSSelector/css-reference.types";
import { BrowserDisplayName } from "@/services/CSSSelector/css-refernce-display.types";
import { IconsBrowser } from "./IconsBrowser";

export const DeviceType = ({
    browsers,
    type,
}: {
    browsers: [BrowserDisplayName, BrowserSupport][];
    type: string;
}) => {
    return (
        <div className="col-start-1">
            <span className="text-fg/85 text-[10px]">{type}</span>
            <div className="row-center-1 [&>div:not(:first-child)]:-ml-4">
                {browsers.map(([name, browser], i) => (
                    <IconsBrowser
                        key={name + i}
                        browser={browser}
                        name={name}
                    />
                ))}
            </div>
        </div>
    );
};
