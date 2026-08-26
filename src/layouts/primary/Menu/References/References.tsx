import { MenuAccordion } from "@/components/accordions/MenuAccordion/MenuAccordion";
import { DynamicSvgIcon } from "@/components/svg/DynamicSVGIcon";
import { useCSSSelector } from "@/hooks/useCSSSelector";
import { CategoryAccordion } from "../CategoryAccordion/CategoryAccordion";

export const References = () => {
    const {
        dataPseudoClasses,
        dataPseudoElements,
        isLoading,
        isFetching,
        isError,
        refetch,
    } = useCSSSelector();

    const loading = isLoading || isFetching;

    return (
        <CategoryAccordion
            title="References"
            icon="ref.svg"
            loading={loading}
            isError={isError}
            refetch={refetch}
        >
            <MenuAccordion
                id="CSS Pseudo Classes"
                icon={
                    <DynamicSvgIcon
                        name="dots.svg"
                        className="h-[20px] w-[20px] fill-fg"
                    />
                }
                title="CSS Pseudo Classes"
                items={dataPseudoClasses.names.map((route) => ({
                    type: "link",
                    title: route,
                    href: `/references/css-pseudo-classes/${encodeURIComponent(route)}`,
                }))}
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
                items={dataPseudoElements.names.map((route) => ({
                    type: "link",
                    title: route,
                    href: `/references/css-pseudo-elements/${encodeURIComponent(route)}`,
                }))}
            />
        </CategoryAccordion>
    );
};
