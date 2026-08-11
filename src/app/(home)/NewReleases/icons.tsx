import { TablerIcon } from "@/components/titles/TitlePost/TablerIcon";

import EasyIcon from "@/icons/easy-pagination.svg";
import PopupIcon from "@/icons/popup.svg";
import ScrollToFutureIcon from "@/icons/scroll-to-future.svg";
import TooltipIcon from "@/icons/tooltip.svg";
import { cloneElement, ReactElement, ReactNode } from "react";

type IconProps = {
    icon: ReactElement<{
        className?: string;
    }>;
};

const Icon = ({ icon }: IconProps) =>
    cloneElement(icon, {
        className: `
            h-7
            w-7
            shrink-0
            fill-fg
        `,
    });

export const packageIcons: Record<string, [ReactNode, string]> = {
    "scroll-to-future": [
        <Icon key="scroll-to-future" icon={<ScrollToFutureIcon />} />,
        "/react/UI-Components/scroll-to-future",
    ],
    "popup-from-future": [
        <Icon key="popup-from-future" icon={<PopupIcon />} />,
        "/react/UI-Components/custom-popup-with-timer-hide",
    ],
    "@ssaprt/tooltip": [
        <Icon key="@ssaprt/tooltip" icon={<TooltipIcon />} />,
        "/react/UI-Components/tooltip",
    ],
    "@ssaprt/easy-pagination": [
        <Icon key="@ssaprt/easy-pagination" icon={<EasyIcon />} />,
        "/react/UI-Components/pagination",
    ],
    "use-image-preview": [
        <TablerIcon
            key="use-image-preview"
            className="w-8 h-8"
            name="scan-eye"
        />,
        "/react/hooks/media/useImagePreview/",
    ],
};

export const iconsNames = Object.keys(packageIcons);
