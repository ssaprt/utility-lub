import { Hooks } from "@/content/react/hooks/Hooks";
import { mediaRoute } from "./media.route";

export const hooksRoute = [
    {
        title: "Hooks",
        path: ["react", "hooks"],
        Component: Hooks,
    },
    ...mediaRoute,
];
