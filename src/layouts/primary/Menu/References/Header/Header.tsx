import { useGetCssSelectorQuery } from "@/services/CSSSelector/css-selector.api";
import { Description } from "./Description";

export const Header = ({ name }: { name: string }) => {
    const { data } = useGetCssSelectorQuery({
        name,
    });
    return (
        <div className="default-block-0">
            <div
                className="
                 row-center-1
                 justify-between
                 w-full
                 p-2
                 bg-fg/10
                 rounded-y-md
                 w-full
                 [&_*]:overflow-hidden
                 [&_*]:text-ellipsis
                 [&_*]:whitespace-nowrap"
            >
                <h3 className="text-xs text-fg/90 ml-2">
                    {`${data?.type.at(0)?.toUpperCase()}${data?.type.slice(1)}`}
                </h3>
                <span className="py-[2px] px-[6px] text-[12px] text-fg/70 rounded-lg bg-app">
                    {name}
                </span>
            </div>

            <Description description={data?.description || ""} />

            {data?.baseline.status && (
                <div className="ml-2 p-2 py-[2px] [&>span]:text-[12px] row-center-1 rounded-[12px] bg-fg/10 mb-2 shadow-2xs shadow-black/25">
                    <span>Baseline:</span>
                    <span>{data?.baseline.status}</span>
                </div>
            )}
        </div>
    );
};
