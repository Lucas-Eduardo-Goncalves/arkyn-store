import { Hono } from "hono";

import { RouteAdapter } from "../../infra/adapters/routeAdapter";
import { createCoreLog } from "../factory/coreLog/createCoreLogFactory";
import { listCoreLogs } from "../factory/coreLog/listCoreLogFactory";

const coreLogRoutes = new Hono();
const { adaptRoute } = new RouteAdapter();

coreLogRoutes.post("/:trafficSourceId", async (c) =>
  adaptRoute(c, createCoreLog.handle)
);

coreLogRoutes.get("/:trafficSourceId", async (c) =>
  adaptRoute(c, listCoreLogs.handle)
);

export { coreLogRoutes };
