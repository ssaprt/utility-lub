import { MenuAccordion } from "@/components/accordions/MenuAccordion/MenuAccordion";
import { CategoryTitle } from "@/components/CategoryTitle/CategoryTitle";
import { DynamicSvgIcon } from "@/components/svg/DynamicSVGIcon";
import { useCSSSelector } from "@/config/references-route/CSSSelector";

export const References = () => {
    const { dataPseudoClasses, dataPseudoElements } = useCSSSelector();
    return (
        <>
            <CategoryTitle
                icon={
                    <DynamicSvgIcon
                        name="ref.svg"
                        className="w-[20px] h-[20px] fill-app"
                    />
                }
            >
                References
            </CategoryTitle>
            <MenuAccordion
                id="CSS Pseudo Classes"
                icon={
                    <DynamicSvgIcon
                        name="dots.svg"
                        className="h-[20px] w-[20px] fill-fg"
                    />
                }
                title="CSS Pseudo Classes"
                items={
                    dataPseudoClasses.names?.map((route) => ({
                        type: "link",
                        title: route,
                        href: `/references/css-pseudo-classes/${encodeURIComponent(route)}`,
                    })) || []
                }
            />
            <MenuAccordion
                id="CSS Pseudo Elements"
                icon={
                    <DynamicSvgIcon
                        name="dots-double.svg"
                        className="h-[20px] w-[20px] fill-fg"
                    />
                }
                title="CSS Pseudo Elements"
                items={
                    dataPseudoElements.names?.map((route) => ({
                        type: "link",
                        title: route,
                        href: `/references/css-pseudo-elements/${encodeURIComponent(route)}`,
                    })) || []
                }
            />
        </>
    );
};
