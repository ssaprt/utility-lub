import { useEffect, useSyncExternalStore } from "react";
import { DynamicSvgIcon } from "../svg/DynamicSVGIcon";

export const collectionMessageComponents = {
    201: "ok",
    400: "bad-request",
    413: "large-file",
    429: "too-many",
    500: "server-error",
};

const subscribe = () => {
    return () => {};
};

export const ControllerMessages = ({
    code,
    message,
    ready,
}: {
    code: keyof typeof collectionMessageComponents;
    message: string;
    ready: (ready: boolean) => void;
}) => {
    const mounted = useSyncExternalStore(
        subscribe,
        () => true,
        () => false,
    );

    useEffect(() => {
        if (mounted) {
            ready(true);
        }
    }, []);
    return (
        <div className="flex flex-col gap-4 items-center select-none py-2 px-3">
            <DynamicSvgIcon
                className="w-14 h-14 fill-fg"
                name={`message/${collectionMessageComponents[code]}.svg`}
            />
            <span className="text-sm text-center text-fg">
                {code === 429
                    ? "Too many requests. Please try again 1 minute later"
                    : message}
            </span>
        </div>
    );
};
