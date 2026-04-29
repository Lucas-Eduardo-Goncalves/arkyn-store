import { Hono } from "hono";

import { RouteAdapter } from "../../infra/adapters/routeAdapter";
import { createResponse } from "../factory/response/createResponseFactory";

const responseRoutes = new Hono();
const { adaptRoute } = new RouteAdapter();

responseRoutes.post("/", async (c) => adaptRoute(c, createResponse.handle));

export { responseRoutes };
