import { Hono } from "hono";

import { RouteAdapter } from "../../infra/adapters/routeAdapter";
import { createHttpTraffic } from "../factory/httpTraffic/createHttpTrafficFactory";
import { deleteHttpTraffic } from "../factory/httpTraffic/deleteHttpTrafficFactory";
import { listHttpTrafficById } from "../factory/httpTraffic/listHttpTrafficByIdFactory";
import { listHttpTraffics } from "../factory/httpTraffic/listHttpTrafficFactory";

const httpTrafficRoutes = new Hono();
const { adaptRoute } = new RouteAdapter();

httpTrafficRoutes.post("/:trafficSourceId", async (c) =>
  adaptRoute(c, createHttpTraffic.handle)
);

httpTrafficRoutes.get("/:trafficSourceId", async (c) =>
  adaptRoute(c, listHttpTraffics.handle)
);

httpTrafficRoutes.get("/:trafficSourceId/:httpTrafficId", async (c) =>
  adaptRoute(c, listHttpTrafficById.handle)
);

httpTrafficRoutes.delete("/:httpTrafficId", async (c) =>
  adaptRoute(c, deleteHttpTraffic.handle)
);

export { httpTrafficRoutes };
