"use client";

import { PageLink } from "@/components/PageLink/PageLink";
import { useAppContextActions } from "@/context/appContext";
import { usePathname, useSelectedLayoutSegments } from "next/navigation";
import { useEffect } from "react";
import { routes } from "./routes";

const startsWithPath = <T,>(path: T[], parent: T[]) => {
    return parent.every((item, index) => item === path[index]);
};

const isDirectChild = <T,>(path: T[], parent: T[]) => {
    return path.length === parent.length + 1 && startsWithPath(path, parent);
};

const hasChildren = <T,>(path: T[], routes: { path: T[] }[]) => {
    return routes.some(
        (route) =>
            route.path.length > path.length && startsWithPath(route.path, path),
    );
};

export const GeneratorRouteComponent = () => {
    const { header } = useAppContextActions();
    const { setTitleHeader, setIconHeader } = header || {};
    const pathname = usePathname();

    const selectedSegments = useSelectedLayoutSegments()[0].split("/");

    const nextRoutes = routes
        .filter((route) => isDirectChild(route.path, selectedSegments))
        .map((route) => ({
            ...route,
            hasChildren: hasChildren(route.path, routes),
        }));

    useEffect(() => {
        setTitleHeader("");
        setIconHeader("");
    }, [setTitleHeader, setIconHeader, pathname]);

    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-2">
            {nextRoutes.map((route) => (
                <PageLink
                    key={route.title}
                    text={route.title}
                    href={`/${route.path.join("/")}`}
                />
            ))}
        </div>
    );
};
