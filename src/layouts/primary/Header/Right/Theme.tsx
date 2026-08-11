import { DynamicSvgIcon } from "@/components/svg/DynamicSVGIcon";
import { useTheme } from "next-themes";

export const Theme = ({
    handleChange,
    svgPath,
    theme,
}: {
    handleChange: () => void;
    svgPath: string;
    theme: string;
}) => {
    const { resolvedTheme } = useTheme();

    const selected = resolvedTheme === theme;

    return (
        <div
            data-select-theme={selected}
            onClick={handleChange}
            className={`
                row-center-1
                justify-end
                min-h-8
                py-[6px]
                px-2
                rounded-[2px]
                bg-app
                hover:cursor-pointer
                ${selected ? "bg-app/80" : ""}
            `}
        >
            <span className="text-fg text-xs">
                {theme.charAt(0).toUpperCase() + theme.slice(1)}
            </span>

            <span className="flex w-5 h-5 shrink-0 items-center justify-center">
                <DynamicSvgIcon name={svgPath} className="w-5 h-5 fill-fg" />
            </span>
        </div>
    );
};
