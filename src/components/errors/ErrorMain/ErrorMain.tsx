import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
import { DynamicSvgIcon } from "@/components/svg/DynamicSVGIcon";
import { useDelayAfterLoad } from "@/hooks/useDelayAfterLoad";
import { useLayoutEffect, useRef } from "react";

export const ErrorMain = ({
    error,
    iconPath,
    idParent,
    fetching,
    onRetry,
    isLoading,
}: {
    error: string;
    iconPath?: `${string}.svg`;
    idParent?: string | React.RefObject<HTMLElement>;
    fetching?: boolean;
    isLoading?: boolean;
    onRetry?: () => void;
}) => {
    const refErrorBlock = useRef<HTMLDivElement>(null);

    const { delayLoad } = useDelayAfterLoad({
        isLoading: Boolean(isLoading || fetching),
        delay: 1000,
    });

    useLayoutEffect(() => {
        const el = refErrorBlock.current;

        if (!el) return;

        const parent = idParent
            ? typeof idParent === "string"
                ? document.getElementById(idParent)
                : idParent.current
            : el.parentElement;

        if (!parent) return;

        const updatePosition = () => {
            const rect = parent.getBoundingClientRect();

            el.style.width = `${rect.width}px`;
            el.style.height = `${rect.height}px`;
            el.style.left = `${rect.left}px`;
            el.style.top = `${rect.top}px`;
        };

        updatePosition();

        const observer = new ResizeObserver(updatePosition);

        observer.observe(parent);

        window.addEventListener("resize", updatePosition);
        window.addEventListener("scroll", updatePosition, true);

        return () => {
            observer.disconnect();

            window.removeEventListener("resize", updatePosition);
            window.removeEventListener("scroll", updatePosition, true);
        };
    }, [idParent]);

    return (
        <div
            ref={refErrorBlock}
            className="fixed z-9999 bg-app col-center-4 justify-center"
        >
            <DynamicSvgIcon
                name={iconPath ?? "error.svg"}
                className="w-14 h-14 fill-fg"
            />

            <span className="text-xs text-fg/90">{error}</span>

            <GeneralButton
                disabled={delayLoad}
                textButton="Retry"
                handleAction={onRetry}
            />
        </div>
    );
};
