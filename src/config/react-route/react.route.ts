import { React } from "@/content/react/React";
import { hooksRoute } from "./hooks/hooks.route";
import { UIComponentsRoute } from "./UI-components-route/UIComponents.route";

export const reactRoute = [
    {
        title: "react",
        path: ["react"],
        Component: React,
    },
    ...hooksRoute,
    ...UIComponentsRoute,
];
