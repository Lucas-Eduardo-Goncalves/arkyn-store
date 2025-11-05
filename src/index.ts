import { Hono } from "hono";
import { hostname } from "os";
import { name, version } from "../package.json";

import { handlersFactory } from "./app/handlers/handlersFactory";
import { RouteLogMiddleware } from "./main/middlewares/routeLogMiddleware";

import { cacheDb } from "./infra/adapters/cacheDbAdapter";
import { DiscordAdapter } from "./infra/adapters/discordAdapter";
import { environmentVariables } from "./main/config/environmentVariables";
import { coreLogRoutes } from "./main/routes/core-log";
import { corePathnameRoutes } from "./main/routes/core-pathname.routes";
import { domainRoutes } from "./main/routes/domain.routes";
import { httpTrafficRecordRoutes } from "./main/routes/http-traffic-record.routes";
import { httpTrafficRoutes } from "./main/routes/http-traffic.routes";
import { pathnameRoutes } from "./main/routes/pathname.routes";
import { requestRoutes } from "./main/routes/request.routes";
import { responseRoutes } from "./main/routes/response.routes";
import { trafficSourceRoutes } from "./main/routes/trafficSource.routes";
import { webhookRoutes } from "./main/routes/webhook.route";

const app = new Hono();

handlersFactory();
DiscordAdapter.getInstance();
cacheDb.connect();

app.use("*", (c, next) => RouteLogMiddleware.logRoute(c, next));

app.get("/health-check", (c) => {
  const message = `Service ${name} is healthy on container ${hostname()} using version ${version}`;
  return c.text(message);
});

app.route("/core-logs", coreLogRoutes);
app.route("/core-pathnames", corePathnameRoutes);
app.route("/domains", domainRoutes);
app.route("/http-traffic-records", httpTrafficRecordRoutes);
app.route("/http-traffics", httpTrafficRoutes);
app.route("/pathnames", pathnameRoutes);
app.route("/requests", requestRoutes);
app.route("/responses", responseRoutes);
app.route("/traffic-sources", trafficSourceRoutes);
app.route("/webhooks", webhookRoutes);

export default {
  port: environmentVariables.PORT,
  fetch: app.fetch,
};
