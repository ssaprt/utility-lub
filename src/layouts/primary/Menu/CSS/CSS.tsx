import { MenuAccordion } from "@/components/accordions/MenuAccordion/MenuAccordion";
import { DynamicSvgIcon } from "@/components/svg/DynamicSVGIcon";
import { CategoryTitle } from "../CategoryTitle/CategoryTitle";

export const CSS = () => {
    return (
        <>
            <CategoryTitle
                icon={
                    <DynamicSvgIcon
                        name="css.svg"
                        className="w-[20px] h-[20px] fill-app"
                    />
                }
            >
                CSS Resources
            </CategoryTitle>
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
                ]}
            />
        </>
    );
};
