import { z } from "zod";

class EnvError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EnvError";
  }
}

const environmentVariablesSchema = z.object({
  // Database configurations
  DATABASE_URL: z.string().url(),
  DIRECT_URL: z.string().url(),

  // Micro services
  MICRO_AUTH_URL: z.string().url(),
  MICRO_PANEL_URL: z.string().url(),

  // Configurations
  JWT_KEY: z.string().min(1),
  DISCORD_BOT_TOKEN: z.string().min(1),
  PORT: z.string().min(4).regex(/^\d+$/).transform(Number),
});

function formatErrorMessage(error: z.ZodError) {
  const title = "Error validating env variables:";
  const lines = Object.entries(error.flatten().fieldErrors).map(
    ([key, value]) => `-> ${key}: ${value}`
  );
  return [title, ...lines].join("\n");
}

const parsedEnv = () => {
  try {
    return environmentVariablesSchema.parse(process.env);
  } catch (error: any) {
    throw new EnvError(formatErrorMessage(error));
  }
};

const environmentVariables = parsedEnv();

export { environmentVariables };
