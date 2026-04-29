import { Hono } from "hono";

import { RouteAdapter } from "../../infra/adapters/routeAdapter";
import { createCorePathname } from "../factory/corePathname/createCorePathnameFactory";
import { deleteCorePathname } from "../factory/corePathname/deleteCorePathnameFactory";
import { listCorePathnames } from "../factory/corePathname/listCorePathnameFactory";

const corePathnameRoutes = new Hono();
const { adaptRoute } = new RouteAdapter();

corePathnameRoutes.post("/:trafficSourceId", async (c) =>
  adaptRoute(c, createCorePathname.handle)
);

corePathnameRoutes.get("/:trafficSourceId", async (c) =>
  adaptRoute(c, listCorePathnames.handle)
);

corePathnameRoutes.delete("/:corePathnameId", async (c) =>
  adaptRoute(c, deleteCorePathname.handle)
);

export { corePathnameRoutes };
