import { Switch } from "@/components/input/switch/Switch";
import { useGetCssSelectorQuery } from "@/services/CSSSelector/css-selector.api";

export const Status = ({ name }: { name: string }) => {
    const { data } = useGetCssSelectorQuery({
        name,
    });
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 w-full lg:grid-cols-auto gap-1">
            {Object.entries(data?.status || {}).map(([key, value]) => (
                <div
                    key={key}
                    className="w-full justify-between p-[4px] pl-3 [&>span]:text-[12px] row-center-1 rounded-lg bg-fg/10 shadow-2xs shadow-black/25"
                >
                    <span>{key}</span>
                    <Switch
                        disabled
                        checked={value}
                        onChange={() => {}}

                        theme="glass"
                    />
                </div>
            ))}
        </div>
    );
};
