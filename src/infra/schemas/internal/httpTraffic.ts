import z from "zod";
import { paginationSchema } from "../template/pagination";

const createHttpTrafficSchema = z.object({
  trafficSourceId: z.uuidv7(),
  method: z.enum(["get", "post", "put", "delete", "patch"]),
  trafficUserId: z.uuidv7("Invalid traffic user id format").nullable(),
  domainId: z.uuidv7("Invalid domain id format"),
  elapsedTime: z.number().min(0, "Elapsed time must be a non-negative number"),
  pathnameId: z.uuidv7("Invalid pathname id format"),
  requestId: z.uuidv7("Invalid request id format"),
  responseId: z.uuidv7("Invalid response id format"),
  status: z
    .number()
    .int("Status must be an integer")
    .min(100, "Status must be at least 100")
    .max(599, "Status must be at most 599"),
});

const deleteHttpTrafficSchema = z.object({
  httpTrafficId: z.uuidv7("Invalid http traffic ID format"),
});

const listHttpTrafficsSchema = paginationSchema.extend({
  trafficSourceId: z.uuidv7("Invalid traffic source id format"),
  status: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : undefined))
    .pipe(z.number().int("Status must be an integer").optional()),
  method: z.enum(["get", "post", "put", "delete", "patch"]).optional(),
  sort: z
    .enum(["elapsedTime", "status", "method", "level", "createdAt"])
    .optional(),
});

export {
  createHttpTrafficSchema,
  deleteHttpTrafficSchema,
  listHttpTrafficsSchema,
};
