import z from "zod";
import { paginationSchema } from "../template/pagination";

const createHttpTrafficSchema = z.object({
  trafficSourceId: z
    .string()
    .min(1, "Traffic source id is required")
    .uuid("Invalid traffic source id format"),
  status: z.number().int("Status must be an integer"),
  method: z.enum(["get", "post", "put", "delete", "patch"]),
  trafficUserId: z.string().uuid("Invalid traffic user id format").nullable(),
  domainId: z.string().uuid("Invalid domain id format"),
  elapsedTime: z.number().min(0, "Elapsed time must be a non-negative number"),
  pathnameId: z.string().uuid("Invalid pathname id format"),
  requestId: z.string().uuid("Invalid request id format"),
  responseId: z.string().uuid("Invalid response id format"),
});

const deleteHttpTrafficSchema = z.object({
  httpTrafficId: z.string().uuid("Invalid http traffic ID format"),
});

const listHttpTrafficsSchema = paginationSchema.extend({
  trafficSourceId: z
    .string()
    .min(1, "Traffic source id is required")
    .uuid("Invalid traffic source id format"),
  status: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : undefined))
    .pipe(z.number().int("Status must be an integer").optional()),
  method: z.enum(["get", "post", "put", "delete", "patch"]).optional(),
  sort: z.enum(["elapsedTime", "status", "method", "level"]).optional(),
});

export {
  createHttpTrafficSchema,
  deleteHttpTrafficSchema,
  listHttpTrafficsSchema,
};
