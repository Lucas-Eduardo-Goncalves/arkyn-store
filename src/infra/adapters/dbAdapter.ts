import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../../prisma/generated/client";
import { environmentVariables } from "../../main/config/environmentVariables";

declare global {
  var prisma: PrismaClient | undefined;
}

const prismaPg = new PrismaPg({
  url: environmentVariables.DATABASE_URL,
  directUrl: environmentVariables.DIRECT_URL,
});

const prisma = global.prisma || new PrismaClient({ adapter: prismaPg });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

const databaseConnection = prisma;
export { databaseConnection };
