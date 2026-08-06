import { TableOfRussianCities } from "@/content/OpenData/SqlTables/TableOfRussianCities/TableOfRussianCities";
import { UseImagePreview } from "@/content/react/hooks/media/useImagePreview/UseImagePreview";
import { EasyPagination } from "@/content/react/UI-Components/Pagination/EasyPagination";
import { ScrollToFuture } from "@/content/react/UI-Components/scroll-to-future/ScrollToFuture";
import { Tooltip } from "@/content/react/UI-Components/Tooltip/Tooltip";
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
    {
        title: "Tooltip",
        path: ["react", "UI-Components", "tooltip"],
        Component: Tooltip,
    },
    {
        title: "TableOfRussianCities",
        path: ["open-data", "table-of-russian-cities"],
        Component: TableOfRussianCities,
    },
] as const satisfies readonly AppRoute[];
