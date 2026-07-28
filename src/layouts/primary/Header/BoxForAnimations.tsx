import { useAppContextActions } from "@/context/appContext";
import { useEffect, useRef } from "react";

export const BoxForAnimations = () => {
    const ref = useRef<HTMLDivElement>(null);
    const { header } = useAppContextActions();
    const setBoxForAnimations = header.setBoxForAnimations;

    useEffect(() => {
        if (ref.current) {
            setBoxForAnimations(ref.current);
        }
    }, []);

    return (
        <div
            ref={ref}
            className="-z-1 absolute bottom-0 left-0 h-full [background:var(--background)] opacity-0"
        ></div>
    );
};
