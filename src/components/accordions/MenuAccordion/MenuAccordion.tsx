"use client";

import { AppLink } from "@/content/react/UI-Components/Pagination/components/link/AppLink";
import {
    MenuAccordionProvider,
    useMenuAccordionContext,
} from "@/context/menuAccordionContext";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { BodyAccordion } from "./BodyAccordion";
import { HeadAccordion } from "./HeadAccordion";
import styles from "./MenuAccordion.module.scss";

export type MenuLinkItem = {
    type: "link";
    title: string;
    href: string;
    icon?: ReactNode;
};

export type NestedAccordionItem = {
    type: "accordion";
    id?: string;
    title: string;
    icon?: ReactNode;
    items: MenuItem[];
};

export type MenuItem = MenuLinkItem | NestedAccordionItem;

export type MenuAccordionProps = {
    id?: string;
    title: string;
    icon?: ReactNode;
    items: MenuItem[];
};

const normalizePath = (value: string): string => {
    const path = value.split("?")[0].split("#")[0];
    const normalized = path.replace(/\/+$/, "");

    return normalized || "/";
};

const isCurrentPath = (pathname: string, href: string): boolean =>
    normalizePath(pathname) === normalizePath(href);

const containsActiveLink = (items: MenuItem[], pathname: string): boolean =>
    items.some((item) => {
        if (item.type === "link") {
            return isCurrentPath(pathname, item.href);
        }

        return containsActiveLink(item.items, pathname);
    });

export const MenuAccordion = ({
    id,
    title,
    icon,
    items,
}: MenuAccordionProps) => {
    const pathname = usePathname();

    const rootNode: NestedAccordionItem = {
        type: "accordion",
        id,
        title,
        icon,
        items,
    };

    return (
        <MenuAccordionNode
            node={rootNode}
            pathname={pathname}
            isRoot
            level={0}
        />
    );
};

type MenuAccordionNodeProps = {
    node: NestedAccordionItem;
    pathname: string;
    isRoot?: boolean;
    level: number;
};

const MenuAccordionNode = ({
    node,
    pathname,
    isRoot = false,
    level,
}: MenuAccordionNodeProps) => {
    return (
        <MenuAccordionProvider>
            <Accordion
                node={node}
                pathname={pathname}
                isRoot={isRoot}
                level={level}
            />
        </MenuAccordionProvider>
    );
};

type AccordionProps = {
    node: NestedAccordionItem;
    pathname: string;
    isRoot: boolean;
    level: number;
};

const Accordion = ({ node, pathname, level }: AccordionProps) => {
    const { openOverride, setOpenOverride } = useMenuAccordionContext();

    const hasActiveLinkInBranch = containsActiveLink(node.items, pathname);

    const isOpen = openOverride ?? hasActiveLinkInBranch;

    const isHeadActive = hasActiveLinkInBranch || openOverride === true;

    const handleToggle = () => {
        setOpenOverride(!isOpen);
    };

    useEffect(() => {
        setOpenOverride(null);
    }, [pathname, setOpenOverride]);

    return (
        <div
            className={`${styles.accordion} ${isOpen ? styles.open : ""}`}
            data-level={level}
        >
            <HeadAccordion
                icon={node.icon}
                title={node.title}
                isOpen={isOpen}
                isActive={isHeadActive}
                onClick={handleToggle}
            />

            <BodyAccordion>
                {node.items.map((item, index) => {
                    const isLast = index === node.items.length - 1;

                    if (item.type === "link") {
                        const isActive = isCurrentPath(pathname, item.href);

                        return (
                            <div
                                key={item.href}
                                className={`
                        ${styles.treeItem}
                        ${styles.treeLinkItem}
                        ${isLast ? styles.treeItemLast : ""}
             
                                lg:p-[3px_4px] 
                                `}
                            >
                                <AppLink
                                    href={item.href}
                                    aria-current={isActive ? "page" : undefined}
                                    className={`${styles.link} ${
                                        isActive ? styles.linkActive : ""
                                    } rounded-[4px] 
                                      lg:rounded-[24px] 
                                      px-[var(--space-3)] 
                                      py-[var(--space-3)]
                                      
                                      lg:px-[var(--space-2)] 
                                      lg:py-[var(--space-1)]
                                      `}
                                >
                                    {item.icon && (
                                        <span className={styles.linkIcon}>
                                            {item.icon}
                                        </span>
                                    )}

                                    <span>{item.title}</span>
                                </AppLink>
                            </div>
                        );
                    }

                    return (
                        <div
                            key={item.id ?? `${item.title}-${index}`}
                            className={`
                    ${styles.treeItem}
                    ${isLast ? styles.treeItemLast : ""}
                `}
                        >
                            <MenuAccordionNode
                                node={item}
                                pathname={pathname}
                                level={level + 1}
                            />
                        </div>
                    );
                })}
            </BodyAccordion>
        </div>
    );
};
