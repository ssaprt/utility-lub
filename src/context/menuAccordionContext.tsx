"use client";

import {
    createContext,
    useContext,
    useMemo,
    useState,
    type Dispatch,
    type ReactNode,
    type SetStateAction,
} from "react";

type MenuAccordionContextType = {
    openOverride: boolean | null;
    setOpenOverride: Dispatch<SetStateAction<boolean | null>>;
};

const MenuAccordionContext = createContext<MenuAccordionContextType | null>(
    null,
);

export const MenuAccordionProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [openOverride, setOpenOverride] = useState<boolean | null>(null);

    const value = useMemo(
        () => ({
            openOverride,
            setOpenOverride,
        }),
        [openOverride],
    );

    return (
        <MenuAccordionContext.Provider value={value}>
            {children}
        </MenuAccordionContext.Provider>
    );
};

export const useMenuAccordionContext = (): MenuAccordionContextType => {
    const context = useContext(MenuAccordionContext);

    if (!context) {
        throw new Error(
            "useMenuAccordionContext должен использоваться внутри MenuAccordionProvider",
        );
    }

    return context;
};
