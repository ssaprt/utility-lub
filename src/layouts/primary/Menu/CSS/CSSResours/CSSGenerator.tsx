import { MenuAccordion } from "@/components/accordions/MenuAccordion/MenuAccordion";
import { DynamicSvgIcon } from "@/components/svg/DynamicSVGIcon";

export const CSSGenerator = () => {
    return (
        <MenuAccordion
            id="CSS"
            icon={
                <DynamicSvgIcon
                    name="gears.svg"
                    className="h-[20px] w-[20px] fill-fg"
                />
            }
            title="CSS Generator"
            items={[
                {
                    type: "link",
                    href: "/css/generator/gradient",
                    title: "Gradient Generator",
                },
                {
                    type: "link",
                    href: "/css/generator/pattern",
                    title: "BG Pattern Generator",
                },
                {
                    type: "link",
                    href: "/css/generator/clip-patch",
                    title: "Clip Patch Generator",
                },
                {
                    type: "link",
                    href: "/css/generator/box-shadow",
                    title: "Box Shadow Generator",
                },
            ]}
        />
    );
};
