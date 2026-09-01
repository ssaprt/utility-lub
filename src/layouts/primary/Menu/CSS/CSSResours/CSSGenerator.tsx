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
                {
                    type: "link",
                    href: "/css/generator/border",
                    title: "Border Generator",
                },
                {
                    type: "link",
                    href: "/css/generator/flex",
                    title: "CSS Flex Box Generator",
                },
                {
                    type: "link",
                    href: "/css/generator/grid",
                    title: "CSS Grid Generator",
                },
                {
                    type: "link",
                    href: "/css/generator/filter",
                    title: "Image Filter Generator",
                },
                {
                    type: "link",
                    href: "/css/generator/animated-text",
                    title: "Animated Text Generator",
                },
                {
                    type: "link",
                    href: "/css/generator/border-image",
                    title: "Border Image Generator",
                },
                {
                    type: "link",
                    href: "/css/generator/animation",
                    title: "Animation Generator",
                },
                {
                    type: "link",
                    href: "/css/generator/button",
                    title: "Button Generator",
                },
                {
                    type: "link",
                    href: "/css/generator/checkbox-radio",
                    title: "Checkbox & Radio Generator",
                },
                {
                    type: "link",
                    href: "/css/generator/glitch-text",
                    title: "Glitch Text Generator",
                },
                {
                    type: "link",
                    href: "/css/generator/gradient-border",
                    title: "Gradient Border Generator",
                },
                {
                    type: "link",
                    href: "/css/generator/input-range",
                    title: "Input Range Generator",
                },
                {
                    type: "link",
                    href: "/css/generator/layout",
                    title: "Layout Generator",
                },
                {
                    type: "link",
                    href: "/css/generator/loader",
                    title: "Loader Generator",
                },
                {
                    type: "link",
                    href: "/css/generator/nth-child",
                    title: "nth-child Tester",
                },
                {
                    type: "link",
                    href: "/css/generator/ribbon",
                    title: "Ribbon Generator",
                },
                {
                    type: "link",
                    href: "/css/generator/skeleton-loader",
                    title: "Skeleton Loader Generator",
                },
                {
                    type: "link",
                    href: "/css/generator/cubic-bezier",
                    title: "Cubic Bezier Generator",
                },
                {
                    type: "link",
                    href: "/css/generator/flip-switch",
                    title: "Flip Switch Generator",
                },
                {
                    type: "link",
                    href: "/css/generator/glassmorphism",
                    title: "Glassmorphism Generator",
                },
                {
                    type: "link",
                    href: "/css/generator/triangle",
                    title: "Triangle Generator",
                },
                {
                    type: "link",
                    href: "/css/generator/toast",
                    title: "Toast Generator",
                },
                {
                    type: "link",
                    href: "/css/generator/text-shadow",
                    title: "Text Shadow Generator",
                },
                {
                    type: "link",
                    href: "/css/generator/input",
                    title: "Text Input Generator",
                },
                {
                    type: "link",
                    href: "/css/generator/text-gradient",
                    title: "Text Gradient Generator",
                },
                {
                    type: "link",
                    href: "/css/generator/sprite",
                    title: "Sprite Generator",
                },
                {
                    type: "link",
                    href: "/css/generator/transform-3d",
                    title: "3D Transform Generator",
                },
            ]}
        />
    );
};
