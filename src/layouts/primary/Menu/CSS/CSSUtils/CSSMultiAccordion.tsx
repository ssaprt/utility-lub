import { MenuAccordion } from "@/components/accordions/MenuAccordion/MenuAccordion";
import { DynamicSvgIcon } from "@/components/svg/DynamicSVGIcon";
import {
    compilerGroup,
    compilerRoute,
} from "@/content/CSS/Utils/Compiler/common/compiler-generate-route";

export const CSSMultiAccordion = () => {
    return compilerGroup.map((group) => {
        const routes = compilerRoute.filter(
            (route) => route.path[2] === group.titlePath,
        );

        return (
            <MenuAccordion
                key={group.titlePath}
                id={group.titlePath}
                icon={
                    <DynamicSvgIcon
                        name={group.icon}
                        className="h-5 w-5 fill-fg"
                    />
                }
                title={group.title}
                items={routes.map((route) => ({
                    type: "link" as const,
                    title: route.title,
                    href: `/${route.path.join("/")}`,
                }))}
            />
        );
    });
};
