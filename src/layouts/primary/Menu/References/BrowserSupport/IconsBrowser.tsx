import { DynamicSvgIcon } from "@/components/svg/DynamicSVGIcon";
import { BrowserSupport as BrowserSupportType } from "@/services/CSSSelector/css-reference.types";
import { BrowserDisplayName } from "@/services/CSSSelector/css-refernce-display.types";
import { Tooltip } from "@ssaprt/tooltip";
import { useMemo } from "react";
import { ContentTooltip } from "./ContentTooltip";
import { iconsDataSupports } from "./icons-data-supports";

export const IconsBrowser = ({
    browser,
    name,
}: {
    browser: BrowserSupportType;
    name: BrowserDisplayName;
}) => {
    const icon = useMemo(() => {
        const icon =
            iconsDataSupports[
                name.toLowerCase() as keyof typeof iconsDataSupports
            ];
        return icon.icon;
    }, [name]);

    const typeDevice = iconsDataSupports[name].name;

    return (
        <Tooltip
            content={<ContentTooltip browser={browser} name={typeDevice} />}
        >
            <div
                onMouseMove={(e) =>
                    ((e.target as HTMLElement).style.zIndex = "2")
                }
                onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.zIndex = "1")
                }
                style={{
                    background: browser.supported
                        ? "linear-gradient(135deg, #052e16 0%, #15803d 100%)"
                        : "linear-gradient(135deg, #7f1d1d 0%, #dc2626 100%)",
                }}
                className={`p-2 z-1 w-12 h-12 relative border-2 border-fg rounded-full shadow-md shadow-black/40 transition-all
                        duration-130
                        ease-in-out
                        hover:cursor-pointer
                        hover:-translate-y-[2px]`}
            >
                <DynamicSvgIcon
                    name={icon}
                    className="fill-fg rounded-full pointer-events-none"
                />
            </div>
        </Tooltip>
    );
};
