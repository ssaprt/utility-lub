import { Author } from "@/app/(home)/Author/Author";
import { cssRoute } from "./css-route/css.route";
import { openDataRoute } from "./open-data-route/open-data.route";
import { reactRoute } from "./react-route/react.route";
import { referencesRoute } from "./references-route/references.route";

export const routes = [
    ...openDataRoute,
    ...reactRoute,
    ...cssRoute,
    ...referencesRoute,
    {
        title: "Author",
        path: ["author"],
        Component: Author,
    },
];
