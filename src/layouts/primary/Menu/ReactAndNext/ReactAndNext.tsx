import { MenuAccordion } from "@/components/accordions/MenuAccordion/MenuAccordion";
import {
    IconBrandReactNative,
    IconComponents,
    IconFishHook,
} from "@tabler/icons-react";
import { CategoryTitle } from "../../../../components/CategoryTitle/CategoryTitle";

export const ReactAndNext = () => {
    return (
        <div className="relative px-2 py-1 rounded-lg bg-fg/10">
            <CategoryTitle
                icon={
                    <IconBrandReactNative className="w-[20px] h-[20px] stroke-app" />
                }
            >
                React and NextJS
            </CategoryTitle>
            <MenuAccordion
                id="packages"
                icon={<IconFishHook className="h-[20px] w-[20px]" />}
                title="Hooks"
                items={[
                    {
                        type: "accordion",
                        title: "media",
                        items: [
                            {
                                type: "link",
                                href: "/react/hooks/media/useImagePreview",
                                title: "media file preview",
                            },
                        ],
                    },
                ]}
            />

            <MenuAccordion
                id="UI Components"
                icon={<IconComponents className="h-[20px] w-[20px]" />}
                title="UI Components"
                items={[
                    {
                        type: "link",
                        title: "Pagination",
                        href: "/react/UI-Components/pagination",
                    },
                    {
                        type: "link",
                        title: "ScrollBar",
                        href: "/react/UI-Components/scroll-to-future",
                    },
                    {
                        type: "link",
                        title: "Tooltip",
                        href: "/react/UI-Components/tooltip",
                    },
                    {
                        type: "link",
                        title: "Popup with timer hide",
                        href: "/react/UI-Components/custom-popup-with-timer-hide",
                    },
                ]}
            />
        </div>
    );
};
