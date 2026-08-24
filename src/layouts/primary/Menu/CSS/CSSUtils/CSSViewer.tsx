import { MenuAccordion } from "@/components/accordions/MenuAccordion/MenuAccordion";
import { DynamicSvgIcon } from "@/components/svg/DynamicSVGIcon";

export const CSSViewer = () => {
    return (
        <MenuAccordion
            id="CSS Viewer"
            icon={
                <DynamicSvgIcon
                    name="viewer.svg"
                    className="h-[20px] w-[20px] fill-fg"
                />
            }
            title="CSS Viewer"
            items={[
                {
                    type: "link",
                    title: "CSS Cursor Viewer",
                    href: `/css/utils/viewer/cursor`,
                },
            ]}
        />
    );
};
