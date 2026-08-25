import { DynamicSvgIcon } from "@/components/svg/DynamicSVGIcon";
import { BrowserDisplayName } from "@/services/CSSSelector/css-refernce-display.types";
import { useGetCssSelectorQuery } from "@/services/CSSSelector/css-selector.api";
import { DeviceType } from "./DeviceType";
import { BrowserDeviceType, iconsDataSupports } from "./icons-data-supports";

export const BrowserSupport = ({ name }: { name: string }) => {
    const { data } = useGetCssSelectorQuery({
        name,
    });

    if (!data) return null;

    const browsers = Object.entries(data.browsers) as [
        BrowserDisplayName,
        (typeof data.browsers)[BrowserDisplayName],
    ][];

    const groupedBrowsers = browsers.reduce(
        (groups, [name, browser]) => {
            const typeDevice = iconsDataSupports[name].typeDevice;

            groups[typeDevice].push([name, browser]);

            return groups;
        },
        {
            desktop: [],
            mobile: [],
            webview: [],
        } as Record<BrowserDeviceType, typeof browsers>,
    );

    return (
        <div className="default-block-4 gap-4">
            <div className="row-center-1">
                <DynamicSvgIcon
                    name="browser/browser.svg"
                    className="w-6 h-6 fill-fg"
                />
                <span className="text-[16px]">Browser supports</span>
            </div>
            <div className="col-start-3">
                <DeviceType
                    browsers={groupedBrowsers.desktop}
                    type={"Desktop"}
                />
                <DeviceType browsers={groupedBrowsers.mobile} type={"Mobile"} />
                <DeviceType
                    browsers={groupedBrowsers.webview}
                    type={"Webview"}
                />
            </div>
        </div>
    );
};
