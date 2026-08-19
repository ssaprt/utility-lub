import { DynamicSvgIcon } from "@/components/svg/DynamicSVGIcon";
import { useAppContextActions } from "@/context/appContext";
import { usePathname } from "next/navigation";
import { useEffect, useMemo } from "react";
import { config } from "../common/compiler.config";

export const useCompiler = () => {
    const { header } = useAppContextActions();
    const { setIconHeader, setTitleHeader } = header || {};
    const pathname = usePathname();

    const segment = useMemo(() => {
        const parts = pathname.split("/").filter(Boolean);
        return parts.at(-1);
    }, [pathname]);

    const selectFromConfig = config.find(
        (item) => item.titleLink.replace(/\s+/g, "-").toLowerCase() === segment,
    );

    useEffect(() => {
        setIconHeader(
            <DynamicSvgIcon name="converter.svg" className="w-8 h-8 fill-fg" />,
        );
        setTitleHeader(selectFromConfig?.titleLink || "");
    }, [setIconHeader, setTitleHeader, selectFromConfig?.titleLink]);

    return { selectFromConfig };
};
