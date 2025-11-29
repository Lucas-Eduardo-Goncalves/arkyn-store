import z from "zod";

const createRequestSchema = z.object({
  headers: z.string().min(1, "Headers cannot be empty"),
  body: z.string().nullable(),
  queryParams: z.string().min(1, "Query params cannot be empty"),
});

const deleteRequestSchema = z.object({
  requestId: z.uuidv7("Invalid id format"),
});

export { createRequestSchema, deleteRequestSchema };
