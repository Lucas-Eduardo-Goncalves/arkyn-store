import { Hono } from "hono";
import { hostname } from "os";
import { name, version } from "../package.json";

import { handlersFactory } from "./app/handlers/handlersFactory";

import { environmentVariables } from "./main/config/environmentVariables";
import { RouteLogMiddleware } from "./main/middlewares/routeLogMiddleware";

import { DiscordAdapter } from "./infra/adapters/discordAdapter";

import { coreLogRoutes } from "./main/routes/coreLog";
import { corePathnameRoutes } from "./main/routes/corePathname";
import { domainRoutes } from "./main/routes/domain";
import { httpTrafficRoutes } from "./main/routes/httpTraffic";
import { httpTrafficRecordRoutes } from "./main/routes/httpTrafficRecord";
import { pathnameRoutes } from "./main/routes/pathname";
import { requestRoutes } from "./main/routes/request";
import { responseRoutes } from "./main/routes/response";
import { sharedTrafficSourceRoutes } from "./main/routes/sharedTrafficSource";
import { trafficSourceRoutes } from "./main/routes/trafficSource";
import { webhookRoutes } from "./main/routes/webhook";

const app = new Hono();

handlersFactory();
DiscordAdapter.getInstance();

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
app.route("/shared-traffic-sources", sharedTrafficSourceRoutes);
app.route("/traffic-sources", trafficSourceRoutes);
app.route("/webhooks", webhookRoutes);

export default {
  port: environmentVariables.PORT,
  fetch: app.fetch,
};
