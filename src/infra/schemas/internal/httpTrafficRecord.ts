import { z } from "zod";
import { paginationSchema } from "../template/pagination";

const composeHttpTrafficRecordSchema = z.object({
  domainUrl: z.url("Invalid URL format"),
  pathnameUrl: z
    .string()
    .min(1, "Pathname url is required")
    .regex(/^\//, "Pathname must start with /")
    .refine(
      (val) => {
        try {
          new URL(`http://example.com${val}`);
          return true;
        } catch (error) {
          return false;
        }
      },
      { message: "Invalid pathname format" }
    ),
  trafficSourceId: z.uuidv7("Invalid traffic source id format"),
  status: z
    .number()
    .int("Status must be an integer")
    .min(100, "Status must be at least 100")
    .max(599, "Status must be at most 599"),
  protocol: z.enum(["http", "https"]),
  method: z.enum(["get", "post", "put", "delete", "patch"]),
  trafficUserId: z.uuidv7("Invalid traffic user id format").nullable(),
  elapsedTime: z.number().min(0, "Elapsed time must be a non-negative number"),
  requestHeaders: z.string().min(1, "Request headers cannot be empty"),
  requestBody: z.string().nullable(),
  queryParams: z.string().min(1, "Query params cannot be empty"),
  responseHeaders: z.string().min(1, "Response headers cannot be empty"),
  responseBody: z.string().nullable(),
});

const listHttpTrafficRecordsSchema = paginationSchema
  .extend({
    id: z.uuidv7("Invalid http traffic record ID format").optional(),
    method: z.enum(["get", "post", "put", "delete", "patch"]).optional(),
    level: z.enum(["info", "warning", "fatal"]).optional(),
    protocol: z.enum(["http", "https"]).optional(),
    trafficSourceId: z
      .string()
      .min(1, "Traffic source id is required")
      .uuid("Invalid traffic source id format"),
    domainId: z.uuidv7("Invalid domain id format").optional(),
    pathnameId: z.uuidv7("Invalid pathname id format").optional(),
    status: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val, 10) : undefined))
      .pipe(z.number().int("Status must be an integer").optional()),
    startDate: z.coerce.date("Invalid start date format").optional(),
    endDate: z.coerce.date("Invalid end date format").optional(),
    requestBodyPreview: z
      .string()
      .min(1, "Request body preview cannot be empty")
      .optional(),
    responseBodyPreview: z
      .string()
      .min(1, "Response body preview cannot be empty")
      .optional(),
    sort: z.enum(["elapsedTime", "status", "method", "level"]).optional(),
  })
  .refine((data) => !data.startDate || !data.endDate || data.startDate <= data.endDate, {
    message: "startDate must be before or equal to endDate",
    path: ["endDate"],
  });

export { composeHttpTrafficRecordSchema, listHttpTrafficRecordsSchema };
