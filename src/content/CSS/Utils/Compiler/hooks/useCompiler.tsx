import { DynamicSvgIcon } from "@/components/svg/DynamicSVGIcon";
import { useAppContextActions } from "@/context/appContext";
import { usePathname } from "next/navigation";
import { useEffect, useMemo } from "react";
import { createPathSegment } from "../common/compiler-generate-route";
import { config } from "../common/compiler.config";

const compilerConfigs = Object.values(config).flat();

export const useCompiler = () => {
    const { header } = useAppContextActions();
    const { setIconHeader, setTitleHeader } = header;
    const pathname = usePathname();

    const segment = useMemo(() => {
        const parts = pathname.split("/").filter(Boolean);

        return parts.at(-1) ?? "";
    }, [pathname]);

    const selectFromConfig = useMemo(
        () =>
            compilerConfigs.find(
                (item) => createPathSegment(item.titleLink) === segment,
            ),
        [segment],
    );

    useEffect(() => {
        if (!selectFromConfig) {
            setIconHeader(null);
            setTitleHeader("");
            return;
        }

        setIconHeader(
            <DynamicSvgIcon name="converter.svg" className="h-8 w-8 fill-fg" />,
        );

        setTitleHeader(selectFromConfig.titleLink);
    }, [selectFromConfig, setIconHeader, setTitleHeader]);

    return {
        selectFromConfig,
    };
};
