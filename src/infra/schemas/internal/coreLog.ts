import z from "zod";
import { paginationSchema } from "../template/pagination";

const createCoreLogSchema = z.object({
  trafficSourceId: z.uuidv7("Invalid traffic source id format"),
  status: z.number().int("Status must be an integer"),
  method: z.enum(["get", "post", "put", "delete", "patch"]),
  trafficUserId: z.uuidv7("Invalid traffic user id format").nullable(),
  elapsedTime: z.number().min(0, "Elapsed time must be a non-negative number"),
  corePathnameId: z.uuidv7("Invalid pathname id format"),
  requestId: z.uuidv7("Invalid request id format"),
  responseId: z.uuidv7("Invalid response id format"),
});

const deleteCoreLogSchema = z.object({
  coreLogId: z.uuidv7("Invalid http traffic ID format"),
});

const listCoreLogsSchema = paginationSchema.extend({
  trafficSourceId: z.uuidv7("Invalid traffic source id format"),
});

export { createCoreLogSchema, deleteCoreLogSchema, listCoreLogsSchema };
