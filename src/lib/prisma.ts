import { PrismaClient } from "@prisma/client";

// create a new Prisma client for database access
export const prisma = new PrismaClient({
  log: ["query"],
});
