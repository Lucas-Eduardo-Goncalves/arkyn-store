import z from "zod";
import { paginationSchema } from "../template/pagination";

const createDomainSchema = z.object({
  value: z.string().min(1, "Value is required").url("Invalid URL format"),
  protocol: z.enum(["http", "https"]),
  trafficSourceId: z.uuidv7("Invalid traffic source id format"),
});

const deleteDomainSchema = z.object({
  domainId: z.uuidv7("Invalid id format"),
});

const listDomainsSchema = paginationSchema.extend({
  trafficSourceId: z.uuidv7("Invalid traffic source id format"),
  sort: z.enum(["createdAt", "value", "protocol"]).optional(),
});

export { createDomainSchema, deleteDomainSchema, listDomainsSchema };
