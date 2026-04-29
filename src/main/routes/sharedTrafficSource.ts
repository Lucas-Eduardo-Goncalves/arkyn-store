import { Hono } from "hono";

import { RouteAdapter } from "../../infra/adapters/routeAdapter";
import { acceptSharedTrafficSourceInvite } from "../factory/sharedTrafficSource/acceptSharedTrafficSourceInviteFactory";
import { rejectSharedTrafficSourceInvite } from "../factory/sharedTrafficSource/rejectTrafficSourceInviteFactory";
import { createSharedTrafficSource } from "../factory/sharedTrafficSource/createSharedTrafficSourceFactory";
import { listSharedTrafficSources } from "../factory/sharedTrafficSource/listSharedTrafficSourcesFactory";

const sharedTrafficSourceRoutes = new Hono();
const { adaptRoute } = new RouteAdapter();

sharedTrafficSourceRoutes.post("/", async (c) =>
  adaptRoute(c, createSharedTrafficSource.handle),
);
sharedTrafficSourceRoutes.get("/", async (c) =>
  adaptRoute(c, listSharedTrafficSources.handle),
);
sharedTrafficSourceRoutes.post("/:sharedTrafficSourceId/accept", async (c) =>
  adaptRoute(c, acceptSharedTrafficSourceInvite.handle),
);
sharedTrafficSourceRoutes.post("/:sharedTrafficSourceId/reject", async (c) =>
  adaptRoute(c, rejectSharedTrafficSourceInvite.handle),
);

export { sharedTrafficSourceRoutes };
