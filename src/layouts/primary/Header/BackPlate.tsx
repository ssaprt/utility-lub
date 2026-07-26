import { useAppContextValues } from "@/context/appContext";

export const BackPlate = () => {
    const isScrolled = useAppContextValues()?.header?.isScrolled;
    return (
        <div
            className={`-z-2 transition-all duration-150 ease  pointer-events-none absolute w-full h-full left-0 top-0 bg-transparent opacity-0 ${isScrolled && "duration-700 [background:var(--background)] opacity-60"}`}
        ></div>
    );
};
