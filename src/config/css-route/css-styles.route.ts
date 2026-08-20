import { Cursor } from "@/content/CSS/Utils/Styles/Cursor/Cursor";

export const stylesRoute = [
    {
        title: "Styles",
        path: ["css", "utils", "styles"],
        Component: () => null,
    },
    {
        title: "CSS Cursor style",
        path: ["css", "utils", "styles", "cursor"],
        Component: Cursor,
    },
];
