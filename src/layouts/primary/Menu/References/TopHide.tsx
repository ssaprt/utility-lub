import { DynamicSvgIcon } from "@/components/svg/DynamicSVGIcon";
import { TitlePost } from "@/components/titles/TitlePost/TitlePost";
import { useGetCssSelectorQuery } from "@/services/CSSSelector/css-selector.api";

export const TopHide = ({ name }: { name: string }) => {
    const { data } = useGetCssSelectorQuery({
        name,
    });
    return (
        <TitlePost
            className="hidden"
            icon={{
                meta:
                    data?.type === "pseudo-class"
                        ? "dots.svg"
                        : "dots-double.svg",
                component: (
                    <DynamicSvgIcon
                        name={
                            data?.type === "pseudo-class"
                                ? "dots.svg"
                                : "dots-double.svg"
                        }
                        className="w-8 h-8 fill-fg"
                    />
                ),
            }}
            description={data?.description || ""}
            useFn={false}
        >
            {data?.name}
        </TitlePost>
    );
};
