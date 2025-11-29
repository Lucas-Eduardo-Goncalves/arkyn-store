import z from "zod";

const listWebhookSchema = z.object({
  trafficSourceId: z.uuidv7("Invalid traffic source ID format"),
});

const createWebhookSchema = z.object({
  trafficSourceId: z.uuidv7("Invalid traffic source ID format"),
  value: z.string().min(1, "Webhook value must not be empty"),
  type: z.enum(["discord"]),
  level: z.enum(["fatal", "warning", "info"]),
});

const updateWebhookSchema = z.object({
  webhookId: z.uuidv7("Invalid traffic source ID format"),
  value: z.string().min(1, "Webhook value must not be empty"),
  level: z.enum(["fatal", "warning", "info"]),
});

const deleteWebhookSchema = z.object({
  webhookId: z.uuidv7("Invalid traffic source ID format"),
});

export {
  createWebhookSchema,
  listWebhookSchema,
  updateWebhookSchema,
  deleteWebhookSchema,
};
