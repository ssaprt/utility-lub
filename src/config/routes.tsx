import { UseImagePreview } from "@/content/react/hooks/media/useImagePreview/UseImagePreview";
import { EasyPagination } from "@/content/react/UI-Components/Pagination/EasyPagination";
import { ScrollToFuture } from "@/content/react/UI-Components/scroll-to-future/ScrollToFuture";
import type { ComponentType } from "react";

export interface AppRoute {
    title: string;
    path: readonly string[];
    Component: ComponentType;
}

export const routes = [
    {
        title: "Easy-pagination",
        path: ["react", "UI-Components", "pagination"],
        Component: EasyPagination,
    },
    {
        title: "useImagePreview",
        path: ["react", "hooks", "media", "useImagePreview"],
        Component: UseImagePreview,
    },
    {
        title: "scroll-to-future",
        path: ["react", "UI-Components", "scroll-to-future"],
        Component: ScrollToFuture,
    },
] as const satisfies readonly AppRoute[];
