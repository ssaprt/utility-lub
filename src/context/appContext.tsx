"use client";

import { useBreakpoint } from "@/hooks/useBreakPoint";
import { detectedScrollMain } from "@/utils/scrolled-main";
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
    type Dispatch,
    type ReactNode,
    type RefObject,
    type SetStateAction,
} from "react";

export type AppRequestStatus = "loading" | "error";

export type AppRequestState = {
    tag: string;
    status: AppRequestStatus;
    message?: string;
    onRetry?: () => void;
};

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
        setVisibleAgent: Dispatch<SetStateAction<boolean>>;
    };
    addLoadData: ({ tag }: { tag: string }) => void;
    removeLoadData: ({ tag }: { tag: string }) => void;
    setRequestState: (request: AppRequestState) => void;
    removeRequestState: ({ tag }: { tag: string }) => void;
}

type AppContextType = {
    header?: {
        iconHeader?: ReactNode;
        titleHeader?: string;
        hrefHeader?: string;
        boxForAnimations?: HTMLDivElement | null;
        themePopupRef?: RefObject<HTMLDialogElement | null>;
        isScrolled: {
            main: HTMLElement | null;
            scroll: {
                scrollTop: number;
                scrolled: boolean;
            };
            position: {
                x: number;
                y: number;
            };
            sizes: {
                width: number;
                height: number;
            };
        };
    };
    menu: {
        openMenu: boolean;
        widthMenu: number;
        noneAnimationMenu: boolean;
        pending: boolean;
        visibleAgent: boolean;
    };
    loadingAnyData: boolean;
    requestError: AppRequestState | null;
};

const AppContextValues = createContext<AppContextType | null>(null);
const AppContextActions = createContext<AppContextActionsType | null>(null);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const [iconHeader, setIconHeader] = useState<ReactNode>(null);
    const [titleHeader, setTitleHeader] = useState("");
    const [hrefHeader, setHrefHeader] = useState("");
    const [loadData, setLoadData] = useState<string[]>([]);
    const [requestStates, setRequestStates] = useState<AppRequestState[]>([]);

    const [boxForAnimations, setBoxForAnimations] =
        useState<HTMLDivElement | null>(null);

    const [isScrolled, setIsScrolled] = useState<{
        main: HTMLElement | null;
        scroll: {
            scrollTop: number;
            scrolled: boolean;
        };
        position: {
            x: number;
            y: number;
        };
        sizes: {
            width: number;
            height: number;
        };
    }>({
        main: null,
        scroll: {
            scrollTop: 0,
            scrolled: false,
        },
        position: {
            x: 0,
            y: 0,
        },
        sizes: {
            width: 0,
            height: 0,
        },
    });

    const themePopupRef = useRef<HTMLDialogElement>(null);

    const [openMenu, setOpenMenu] = useState(false);
    const [widthMenu, setWidthMenu] = useState(0);
    const [noneAnimationMenu, setNoneAnimationMenu] = useState(false);
    const [visibleAgent, setVisibleAgent] = useState(false);

    const isDesktop = useBreakpoint("lg");
    const [pending, setPending] = useState(false);

    const addLoadData = useCallback(({ tag }: { tag: string }) => {
        setLoadData((current) => {
            if (current.includes(tag)) {
                return current;
            }

            return [...current, tag];
        });
    }, []);

    const removeLoadData = useCallback(({ tag }: { tag: string }) => {
        setLoadData((current) => current.filter((item) => item !== tag));
    }, []);

    const setRequestState = useCallback((request: AppRequestState) => {
        setRequestStates((current) => {
            const existing = current.find((item) => item.tag === request.tag);

            if (
                existing?.status === request.status &&
                existing?.message === request.message &&
                existing?.onRetry === request.onRetry
            ) {
                return current;
            }

            return [
                ...current.filter((item) => item.tag !== request.tag),
                request,
            ];
        });
    }, []);

    const removeRequestState = useCallback(({ tag }: { tag: string }) => {
        setRequestStates((current) => {
            const exists = current.some((item) => item.tag === tag);

            if (!exists) {
                return current;
            }

            return current.filter((item) => item.tag !== tag);
        });
    }, []);

    const requestLoading = requestStates.some(
        (request) => request.status === "loading",
    );

    const loadingAnyData = loadData.length > 0 || requestLoading;

    const requestError =
        [...requestStates]
            .reverse()
            .find((request) => request.status === "error") ?? null;

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
                visibleAgent,
            },
            loadingAnyData,
            requestError,
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
            visibleAgent,
            loadingAnyData,
            requestError,
        ],
    );

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
                setVisibleAgent,
            },
            addLoadData,
            removeLoadData,
            setRequestState,
            removeRequestState,
        }),
        [addLoadData, removeLoadData, setRequestState, removeRequestState],
    );

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

export const useAppContextValues = (): AppContextType => {
    const context = useContext(AppContextValues);

    if (context === null) {
        throw new Error(
            "useAppContextValues must be used within AppContextProvider",
        );
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
