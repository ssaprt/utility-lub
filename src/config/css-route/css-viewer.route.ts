import { Cursor } from "@/content/CSS/Utils/Viewer/Cursor/Cursor";

export const cssViewerRoute = [
    {
        title: "Styles",
        path: ["css", "utils", "viewer"],
        Component: () => null,
    },
    {
        title: "CSS Cursor style",
        path: ["css", "utils", "viewer", "cursor"],
        Component: Cursor,
    },
];
