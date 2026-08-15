import { TableOfRussianCities } from "@/content/OpenData/Tables/TableOfRussianCities/TableOfRussianCities";
import { Tables } from "@/content/OpenData/Tables/TableOfRussianCities/Tables";

export const tablesRoute = [
    {
        title: "Tables",
        path: ["open-data", "tables"],
        Component: Tables,
    },
    {
        title: "TableOfRussianCities",
        path: ["open-data", "tables", "table-of-russian-cities"],
        Component: TableOfRussianCities,
    },
];
