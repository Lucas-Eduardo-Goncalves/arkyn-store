import z from "zod";
import { paginationSchema } from "../template/pagination";

const createPathnameSchema = z.object({
  value: z
    .string()
    .min(1, "Value is required")
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
  trafficSourceId: z.uuidv7("Traffic source id is required"),
  domainId: z.uuidv7("Domain id is required"),
});

const deletePathnameSchema = z.object({
  pathnameId: z.uuidv7("Invalid id format"),
});

const listPathnamesSchema = paginationSchema.extend({
  trafficSourceId: z.uuidv7("Invalid traffic source id format"),
  domainId: z.uuidv7("Invalid domain id format"),
  value: z.string().optional(),
  sort: z.enum(["value", "createdAt"]).optional(),
});

export { createPathnameSchema, deletePathnameSchema, listPathnamesSchema };
