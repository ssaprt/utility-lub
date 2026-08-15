//TODO imports =============================================================
"use client";

import { useBreakpoint } from "@/hooks/useBreakPoint";
import { detectedScrollMain } from "@/utils/scrolled-main";

import {
    createContext,
    RefObject,
    useContext,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
    type Dispatch,
    type ReactNode,
    type SetStateAction,
} from "react";
//TODO imports =============================================================

//? types ===============================================================
interface AppContextActionsType {
    header: {
        setIconHeader: Dispatch<SetStateAction<ReactNode>>;
        setTitleHeader: Dispatch<SetStateAction<string>>;
        setHrefHeader: Dispatch<SetStateAction<string>>;
        setBoxForAnimations: Dispatch<SetStateAction<HTMLDivElement | null>>;
    };
    menu: {
        setOpenMenu: Dispatch<SetStateAction<boolean>>;
        setWidthMenu: Dispatch<SetStateAction<number>>;
        setPending: Dispatch<SetStateAction<boolean>>;
        setNoneAnimationMenu: Dispatch<SetStateAction<boolean>>;
    };
}

type AppContextType = {
    header?: {
        iconHeader?: React.ReactNode;
        titleHeader?: string;
        hrefHeader?: string;
        boxForAnimations?: HTMLDivElement | null;
        themePopupRef?: RefObject<HTMLDialogElement | null>;
        isScrolled: {
            main: HTMLElement;
            scroll: { scrollTop: number; scrolled: boolean };
            position: { x: number; y: number };
            sizes: { width: number; height: number };
        };
    };
    menu: {
        openMenu: boolean;
        widthMenu: number;
        noneAnimationMenu: boolean;
        pending: boolean;
    };
};

const AppContextValues = createContext<AppContextType | null>(null);
const AppContextActions = createContext<AppContextActionsType | null>(null);
//? types ===============================================================

//! provider ==========================================================================
export const AppContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    //* header context =============================================
    const [iconHeader, setIconHeader] = useState<ReactNode>(null);
    const [titleHeader, setTitleHeader] = useState("");
    const [hrefHeader, setHrefHeader] = useState("");
    const [boxForAnimations, setBoxForAnimations] =
        useState<HTMLDivElement | null>(null);
    const [isScrolled, setIsScrolled] = useState<{
        main: HTMLElement;
        scroll: { scrollTop: number; scrolled: boolean };
        position: { x: number; y: number };
        sizes: { width: number; height: number };
    }>({
        main: document.body,
        scroll: { scrollTop: 0, scrolled: false },
        position: { x: 0, y: 0 },
        sizes: { width: 0, height: 0 },
    });
    const themePopupRef = useRef<HTMLDialogElement>(null);
    //* header context =============================================

    //* menu context =============================================
    const [openMenu, setOpenMenu] = useState(false);
    const [widthMenu, setWidthMenu] = useState(0);
    const [noneAnimationMenu, setNoneAnimationMenu] = useState(false);
    //* menu context =============================================

    //*general context =============================================
    const isDesktop = useBreakpoint("lg");
    const [pending, setPending] = useState(false);
    //*general context =============================================

    //* context ====================================================
    const values = useMemo<AppContextType>(
        () => ({
            header: {
                iconHeader,
                titleHeader,
                hrefHeader,
                boxForAnimations,
                isScrolled,
                themePopupRef,
            },
            menu: {
                openMenu,
                widthMenu,
                noneAnimationMenu,
                pending,
            },
        }),
        [
            iconHeader,
            titleHeader,
            hrefHeader,
            boxForAnimations,
            isScrolled,
            openMenu,
            widthMenu,
            noneAnimationMenu,
            pending,
        ],
    );
    //* context ====================================================

    //* actions ====================================================
    const actions = useMemo<AppContextActionsType>(
        () => ({
            header: {
                setIconHeader,
                setTitleHeader,
                setHrefHeader,
                setBoxForAnimations,
            },
            menu: {
                setOpenMenu,
                setWidthMenu,
                setNoneAnimationMenu,
                setPending,
            },
        }),
        [],
    );
    //* actions ====================================================

    useEffect(() => {
        const media = window.matchMedia("(min-width: 1024px)");

        const handleChange = () => {
            setOpenMenu(media.matches);
        };

        handleChange();

        media.addEventListener("change", handleChange);

        return () => {
            media.removeEventListener("change", handleChange);
        };
    }, []);

    useLayoutEffect(() => {
        return detectedScrollMain(setIsScrolled);
    }, []);

    useEffect(() => {
        if (isDesktop) {
            //eslint-disable-next-line
            setNoneAnimationMenu(true);
            return;
        }

        if (pending && openMenu) {
            setNoneAnimationMenu(true);
            setOpenMenu(false);
            return;
        }

        if (!pending) {
            setNoneAnimationMenu(false);
        }
    }, [isDesktop, openMenu, pending]);

    return (
        <AppContextValues.Provider value={values}>
            <AppContextActions.Provider value={actions}>
                {children}
            </AppContextActions.Provider>
        </AppContextValues.Provider>
    );
};
//! provider ==========================================================================

//! hooks ========================================================================
export const useAppContextValues = (): AppContextType => {
    const context = useContext(AppContextValues);

    if (context === null) {
        throw new Error("useAppContext must be used within AppContextProvider");
    }

    return context;
};

export const useAppContextActions = (): AppContextActionsType => {
    const context = useContext(AppContextActions);

    if (context === null) {
        throw new Error(
            "useAppContextActions must be used within AppContextProvider",
        );
    }

    return context;
};
//! hooks ========================================================================
