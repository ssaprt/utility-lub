import { OpenData } from "@/content/OpenData/OpenData";
import { tablesRoute } from "./tables.route";

export const openDataRoute = [
    {
        title: "OpenData",
        path: ["open-data"],
        Component: OpenData,
    },
    ...tablesRoute,
];
