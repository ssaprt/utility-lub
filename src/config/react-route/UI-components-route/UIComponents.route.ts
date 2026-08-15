import { EasyPagination } from "@/content/react/UI-Components/Pagination/EasyPagination";
import { PopupContent } from "@/content/react/UI-Components/popup/PopupContent";
import { ScrollToFuture } from "@/content/react/UI-Components/scroll-to-future/ScrollToFuture";
import { Tooltip } from "@/content/react/UI-Components/Tooltip/Tooltip";

export const UIComponentsRoute = [
    {
        title: "UI Components",
        path: ["react", "UI-Components"],
        Component: () => null,
    },
    {
        title: "Easy-pagination",
        path: ["react", "UI-Components", "pagination"],
        Component: EasyPagination,
    },

    {
        title: "Scroll to future",
        path: ["react", "UI-Components", "scroll-to-future"],
        Component: ScrollToFuture,
    },
    {
        title: "Tooltip",
        path: ["react", "UI-Components", "tooltip"],
        Component: Tooltip,
    },
    {
        title: "Popup with timer hide",
        path: ["react", "UI-Components", "custom-popup-with-timer-hide"],
        Component: PopupContent,
    },
];
