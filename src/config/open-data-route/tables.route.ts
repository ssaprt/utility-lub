import { TableOfRussianCities } from "@/content/OpenData/Tables/TableOfRussianCities/TableOfRussianCities";

export const tablesRoute = [
    {
        title: "Tables",
        path: ["open-data", "tables"],
        Component: () => null,
    },
    {
        title: "TableOfRussianCities",
        path: ["open-data", "tables", "table-of-russian-cities"],
        Component: TableOfRussianCities,
    },
];
