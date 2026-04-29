import { z } from "zod";
import { paginationSchema } from "../template/pagination";

const createSharedTrafficSourceSchema = z.object({
  userEmail: z.email("Invalid email format"),
  trafficSourceId: z.uuid("Invalid id format"),
});

const acceptSharedTrafficSourceSchema = z.object({
  sharedTrafficSourceId: z.uuid("Invalid id format"),
});

const rejectSharedTrafficSourceSchema = acceptSharedTrafficSourceSchema;
const deleteSharedTrafficSourceSchema = acceptSharedTrafficSourceSchema;

const listSharedTrafficSourcesSchema = paginationSchema.extend({
  sort: z.enum(["createdAt", "updatedAt", "name"]).optional(),
});

export {
  acceptSharedTrafficSourceSchema,
  createSharedTrafficSourceSchema,
  deleteSharedTrafficSourceSchema,
  listSharedTrafficSourcesSchema,
  rejectSharedTrafficSourceSchema,
};
