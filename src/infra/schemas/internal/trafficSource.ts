import { z } from "zod";
import { paginationSchema } from "../template/pagination";

const createTrafficSourceSchema = z.object({
  name: z.string().min(1, "Name is required"),
  trafficDomain: z.url("Invalid URL format"),
});

const updateTrafficSourceSchema = z.object({
  trafficSourceId: z.uuid("Invalid id format"),
  trafficDomain: z.url("Invalid URL format").optional(),
  name: z.string().min(1, "Name is required").optional(),
});

const deleteTrafficSourceSchema = z.object({
  trafficSourceId: z.uuid("Invalid id format"),
});

const listTrafficSourceByIdSchema = z.object({
  trafficSourceId: z.uuid("Invalid user id format"),
});

const listTrafficSourcesSchema = paginationSchema.extend({
  sort: z.enum(["createdAt", "updatedAt", "name"]).optional(),
});

export {
  createTrafficSourceSchema,
  deleteTrafficSourceSchema,
  listTrafficSourceByIdSchema,
  listTrafficSourcesSchema,
  updateTrafficSourceSchema,
};
