import { MenuAccordion } from "@/components/accordions/MenuAccordion/MenuAccordion";
import { DynamicSvgIcon } from "@/components/svg/DynamicSVGIcon";
import { compilerRoute } from "@/content/CSS/Utils/Compiler/common/compiler-generate-route";

export const CSSCompiler = () => {
    return (
        <MenuAccordion
            id="CSS Compiler"
            icon={
                <DynamicSvgIcon
                    name="converter.svg"
                    className="h-[20px] w-[20px] fill-fg"
                />
            }
            title="CSS Compiler"
            items={compilerRoute.map((route) => ({
                type: "link",
                title: route.title,
                href: `/${route.path.join("/")}`,
            }))}
        />
    );
};
