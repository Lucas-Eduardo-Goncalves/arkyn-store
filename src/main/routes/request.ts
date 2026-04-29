import { Hono } from "hono";

import { RouteAdapter } from "../../infra/adapters/routeAdapter";
import { createRequest } from "../factory/request/createRequestFactory";

const requestRoutes = new Hono();
const { adaptRoute } = new RouteAdapter();

requestRoutes.post("/", async (c) => adaptRoute(c, createRequest.handle));

export { requestRoutes };
