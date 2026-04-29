import { Hono } from "hono";

import { RouteAdapter } from "../../infra/adapters/routeAdapter";
import { createWebhook } from "../factory/webhook/createWebhook";
import { deleteWebhook } from "../factory/webhook/deleteWebhook";
import { listWebhooks } from "../factory/webhook/listWebhook";
import { updateWebhook } from "../factory/webhook/updateWebhook";

const webhookRoutes = new Hono();
const { adaptRoute } = new RouteAdapter();

webhookRoutes.post("/:trafficSourceId", async (c) =>
  adaptRoute(c, createWebhook.handle)
);

webhookRoutes.get("/:trafficSourceId", async (c) =>
  adaptRoute(c, listWebhooks.handle)
);

webhookRoutes.put("/:webhookId", async (c) =>
  adaptRoute(c, updateWebhook.handle)
);

webhookRoutes.delete("/:webhookId", async (c) =>
  adaptRoute(c, deleteWebhook.handle)
);

export { webhookRoutes };
