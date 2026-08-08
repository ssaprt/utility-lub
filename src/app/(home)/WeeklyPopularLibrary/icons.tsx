import { TablerIcon } from "@/components/titles/TitlePost/TablerIcon";
import Image from "next/image";
import { ReactNode } from "react";

const IMG = ({ src }: { src: string }) => (
    <Image
        className="w-8 h-8"
        width={40}
        height={40}
        unoptimized
        src={src}
        alt={src}
    />
);

export const packageIcons: Record<string, [ReactNode, string]> = {
    "scroll-to-future": [
        <IMG key="scroll-to-future" src="/scroll-to-future.svg" />,
        "/react/UI-Components/scroll-to-future",
    ],
    "popup-from-future": [
        <IMG key="popup-from-future" src="/popup.svg" />,
        "/react/UI-Components/custom-popup-with-timer-hide",
    ],
    "@ssaprt/tooltip": [
        <IMG key="@ssaprt/tooltip" src="/tooltip.svg" />,
        "/react/UI-Components/tooltip",
    ],
    "@ssaprt/easy-pagination": [
        <IMG key="@ssaprt/easy-pagination" src="/easy-pagination.svg" />,
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
