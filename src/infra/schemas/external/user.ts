import { z } from "zod";

type ExternalUserSchema = z.infer<typeof externalUserSchema>;

const externalUserSchema = z.strictObject({
  id: z.uuidv7(),
  name: z.string(),
  avatarUrl: z.url(),
  email: z.email(),
  utc: z.number(),
  role: z.enum(["admin", "user"]),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export { externalUserSchema, ExternalUserSchema };
