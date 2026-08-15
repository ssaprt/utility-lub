import { tablesRoute } from "./tables.route";

export const openDataRoute = [
    {
        title: "OpenData",
        path: ["open-data"],
        Component: () => null,
    },
    ...tablesRoute,
];
