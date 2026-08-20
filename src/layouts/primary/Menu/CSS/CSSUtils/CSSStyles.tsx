import { MenuAccordion } from "@/components/accordions/MenuAccordion/MenuAccordion";
import { DynamicSvgIcon } from "@/components/svg/DynamicSVGIcon";

export const CSSStyles = () => {
    return (
        <MenuAccordion
            id="CSS Styles"
            icon={
                <DynamicSvgIcon
                    name="style.svg"
                    className="h-[20px] w-[20px] fill-fg"
                />
            }
            title="CSS Styles"
            items={[
                {
                    type: "link",
                    title: "CSS Cursor Style",
                    href: `/css/utils/styles/cursor`,
                },
            ]}
        />
    );
};
