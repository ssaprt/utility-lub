import { MenuAccordion } from "@/components/accordions/MenuAccordion/MenuAccordion";
import { Loader } from "@/components/animationIcons/Loader/Loader";
import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
import { CategoryTitle } from "@/components/CategoryTitle/CategoryTitle";
import { DynamicSvgIcon } from "@/components/svg/DynamicSVGIcon";
import { useCSSSelector } from "@/hooks/useCSSSelector";

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
        <div className="relative px-2 py-1 rounded-lg bg-fg/10">
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

            {loading ? (
                <div className="flex w-full min-h-30 items-center justify-center">
                    <Loader visible mode="wave" />
                </div>
            ) : isError ? (
                <div className="col-center-3 w-full min-h-30 justify-center">
                    <DynamicSvgIcon
                        name="error.svg"
                        className="w-8 h-8 fill-fg"
                    />

                    <span className="text-xs text-fg/70">
                        Failed to load references
                    </span>

                    <GeneralButton
                        variant="minimal"
                        textButton="Try again"
                        handleAction={refetch}
                    />
                </div>
            ) : (
                <>
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
                </>
            )}
        </div>
    );
};
