import { cssRoute } from "./css-route/css.route";
import { openDataRoute } from "./open-data-route/open-data.route";

import { reactRoute } from "./react-route/react.route";

export const routes = [...openDataRoute, ...reactRoute, ...cssRoute];
