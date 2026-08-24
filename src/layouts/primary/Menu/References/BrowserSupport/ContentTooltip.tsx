import { BrowserSupport as BrowserSupportType } from "@/services/CSSSelector/css-reference.types";
import { IconCheck, IconFileSadFilled } from "@tabler/icons-react";

export const ContentTooltip = ({
    browser,
    name,
}: {
    browser: BrowserSupportType;
    name: string;
}) => {
    return (
        <div
            className="
                        col-start-[2px]
                        [&_div]:row-center-1
                        [&_div>span]:text-[9px]
                    "
        >
            <div>
                {browser.supported === true ? (
                    <IconCheck className="w-3 h-3" />
                ) : (
                    <IconFileSadFilled className="w-3 h-3" />
                )}

                <span>
                    {browser.supported === true
                        ? "Supported"
                        : browser.supported === false
                          ? "Not supported"
                          : "Unknown"}
                </span>
            </div>

            <div>
                <span>Browser -</span>
                <span className="text-app/80!">{name}</span>
            </div>

            {browser.versionAdded && (
                <div>
                    <span>Version added -</span>
                    <span className="text-app/80!">{browser.versionAdded}</span>
                </div>
            )}

            {browser.partial && (
                <div>
                    <span>Partial support</span>
                </div>
            )}

            {browser.prefix && (
                <div>
                    <span>Prefix:</span>
                    <span>{browser.prefix}</span>
                </div>
            )}

            {browser.behindFlag && (
                <div>
                    <span>Behind experimental flag</span>
                </div>
            )}
        </div>
    );
};
