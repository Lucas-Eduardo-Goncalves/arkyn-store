import { Hono } from "hono";

import { RouteAdapter } from "../../infra/adapters/routeAdapter";
import { createPathname } from "../factory/pathname/createPathnameFactory";
import { deletePathname } from "../factory/pathname/deletePathnameFactory";
import { listPathnames } from "../factory/pathname/listPathnameFactory";

const pathnameRoutes = new Hono();
const { adaptRoute } = new RouteAdapter();

pathnameRoutes.post("/:trafficSourceId/:domainId", async (c) =>
  adaptRoute(c, createPathname.handle)
);

pathnameRoutes.get("/:trafficSourceId/:domainId", async (c) =>
  adaptRoute(c, listPathnames.handle)
);

pathnameRoutes.delete("/:pathnameId", async (c) =>
  adaptRoute(c, deletePathname.handle)
);

export { pathnameRoutes };
