import { Hono } from "hono";

import { RouteAdapter } from "../../infra/adapters/routeAdapter";
import { createDomain } from "../factory/domain/createDomainFactory";
import { deleteDomain } from "../factory/domain/deleteDomainFactory";
import { listDomains } from "../factory/domain/listDomainFactory";

const domainRoutes = new Hono();
const { adaptRoute } = new RouteAdapter();

domainRoutes.post("/:trafficSourceId", async (c) =>
  adaptRoute(c, createDomain.handle)
);

domainRoutes.get("/:trafficSourceId", async (c) =>
  adaptRoute(c, listDomains.handle)
);

domainRoutes.delete("/:domainId", async (c) =>
  adaptRoute(c, deleteDomain.handle)
);

export { domainRoutes };
