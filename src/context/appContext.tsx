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

export type ElementMetrics = {
    width: number;
    height: number;
    x: number;
    y: number;
    top: number;
    right: number;
    bottom: number;
    left: number;
};

export type AppLayoutMetrics = {
    main: ElementMetrics;
    menu: ElementMetrics;
};

const EMPTY_ELEMENT_METRICS: ElementMetrics = {
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
};

const roundMetric = (value: number) => Math.round(value * 100) / 100;

const getElementMetrics = (element: HTMLElement | null): ElementMetrics => {
    if (!element) {
        return EMPTY_ELEMENT_METRICS;
    }

    const rect = element.getBoundingClientRect();

    return {
        width: roundMetric(rect.width),
        height: roundMetric(rect.height),
        x: roundMetric(rect.x),
        y: roundMetric(rect.y),
        top: roundMetric(rect.top),
        right: roundMetric(rect.right),
        bottom: roundMetric(rect.bottom),
        left: roundMetric(rect.left),
    };
};

const metricsAreEqual = (current: ElementMetrics, next: ElementMetrics) =>
    current.width === next.width &&
    current.height === next.height &&
    current.x === next.x &&
    current.y === next.y &&
    current.top === next.top &&
    current.right === next.right &&
    current.bottom === next.bottom &&
    current.left === next.left;

export type AppRequestStatus = "loading" | "error";

export type AppRequestState = {
    tag: string;
    status: AppRequestStatus;
    message?: string;
    onRetry?: () => void;
};

type ViewRadioControllerStatus = "full" | "large" | "compact" | "hidden";

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
    setViewRadioController: Dispatch<SetStateAction<ViewRadioControllerStatus>>;

    layout: {
        registerMain: (element: HTMLElement | null) => void;
        registerMenu: (element: HTMLElement | null) => void;
        recalculate: () => void;
    };

    addLoadData: ({ tag }: { tag: string }) => void;
    removeLoadData: ({ tag }: { tag: string }) => void;

    setRequestState: (request: AppRequestState) => void;
    removeRequestState: ({ tag }: { tag: string }) => void;

    startLoader: ({ tag }: { tag: string }) => void;
    finishLoader: ({ tag }: { tag: string }) => void;
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

    layout: AppLayoutMetrics;
    viewRadioController: ViewRadioControllerStatus;

    loadingAnyData: boolean;
    requestError: AppRequestState | null;

    animationsReady: boolean;
    activeLoaders: string[];
};

const AppContextValues = createContext<AppContextType | null>(null);
const AppContextActions = createContext<AppContextActionsType | null>(null);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const [iconHeader, setIconHeader] = useState<ReactNode>(null);
    const [titleHeader, setTitleHeader] = useState("");
    const [hrefHeader, setHrefHeader] = useState("");
    const [loadData, setLoadData] = useState<string[]>([]);
    const [requestStates, setRequestStates] = useState<AppRequestState[]>([]);
    const [activeLoaders, setActiveLoaders] = useState<string[]>([]);
    const [viewRadioController, setViewRadioController] =
        useState<ViewRadioControllerStatus>("hidden");

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

    const [mainElement, setMainElement] = useState<HTMLElement | null>(null);
    const [menuElement, setMenuElement] = useState<HTMLElement | null>(null);

    const animationFrameRef = useRef<number | null>(null);

    const [layoutMetrics, setLayoutMetrics] = useState<AppLayoutMetrics>({
        main: EMPTY_ELEMENT_METRICS,
        menu: EMPTY_ELEMENT_METRICS,
    });

    const registerMain = useCallback((element: HTMLElement | null) => {
        setMainElement((current) => (current === element ? current : element));
    }, []);

    const registerMenu = useCallback((element: HTMLElement | null) => {
        setMenuElement((current) => (current === element ? current : element));
    }, []);

    const measureLayout = useCallback(() => {
        animationFrameRef.current = null;

        const nextMetrics: AppLayoutMetrics = {
            main: getElementMetrics(mainElement),
            menu: getElementMetrics(menuElement),
        };

        setLayoutMetrics((current) => {
            const mainEqual = metricsAreEqual(current.main, nextMetrics.main);

            const menuEqual = metricsAreEqual(current.menu, nextMetrics.menu);

            return mainEqual && menuEqual ? current : nextMetrics;
        });
    }, [mainElement, menuElement]);

    const scheduleLayoutMeasure = useCallback(() => {
        if (animationFrameRef.current !== null) {
            return;
        }

        animationFrameRef.current = requestAnimationFrame(measureLayout);
    }, [measureLayout]);

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

    const scrollMainToTop = useCallback(() => {
        if (!mainElement) {
            return;
        }

        mainElement.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant" as ScrollBehavior,
        });
    }, [mainElement]);

    const startLoader = useCallback(
        ({ tag }: { tag: string }) => {
            scrollMainToTop();

            setActiveLoaders((current) => {
                if (current.includes(tag)) {
                    return current;
                }

                return [...current, tag];
            });
        },
        [scrollMainToTop],
    );

    const finishLoader = useCallback(({ tag }: { tag: string }) => {
        setActiveLoaders((current) => {
            if (!current.includes(tag)) {
                return current;
            }

            return current.filter((item) => item !== tag);
        });
    }, []);

    const animationsReady = activeLoaders.length === 0;

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

            layout: layoutMetrics,

            viewRadioController,

            loadingAnyData,
            requestError,

            animationsReady,
            activeLoaders,
        }),
        [
            iconHeader,
            titleHeader,
            hrefHeader,
            boxForAnimations,
            isScrolled,
            layoutMetrics,

            openMenu,
            widthMenu,
            noneAnimationMenu,
            pending,
            visibleAgent,

            loadingAnyData,
            requestError,

            animationsReady,
            activeLoaders,
            viewRadioController,
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

            layout: {
                registerMain,
                registerMenu,
                recalculate: scheduleLayoutMeasure,
            },
            setViewRadioController,

            addLoadData,
            removeLoadData,

            setRequestState,
            removeRequestState,

            startLoader,
            finishLoader,
        }),
        [
            addLoadData,
            removeLoadData,
            setRequestState,
            removeRequestState,
            startLoader,
            finishLoader,
            registerMain,
            registerMenu,
            scheduleLayoutMeasure,
            setViewRadioController,
        ],
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

    useLayoutEffect(() => {
        const elements = [mainElement, menuElement].filter(
            (element): element is HTMLElement => element !== null,
        );

        const resizeObserver = new ResizeObserver(scheduleLayoutMeasure);

        elements.forEach((element) => {
            resizeObserver.observe(element);
        });

        window.addEventListener("resize", scheduleLayoutMeasure);
        window.addEventListener("scroll", scheduleLayoutMeasure, true);

        scheduleLayoutMeasure();

        return () => {
            resizeObserver.disconnect();

            window.removeEventListener("resize", scheduleLayoutMeasure);

            window.removeEventListener("scroll", scheduleLayoutMeasure, true);

            if (animationFrameRef.current !== null) {
                cancelAnimationFrame(animationFrameRef.current);
                animationFrameRef.current = null;
            }
        };
    }, [mainElement, menuElement, scheduleLayoutMeasure]);

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
