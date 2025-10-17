// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// lib/prisma.ts
// فائدة هذا الكود يقوم بعمل فحص
// يرى ما اذا كان  prisma   قد تم انشاءه او لا
// lib/prismaDynamic.ts
// import { PrismaClient } from "@prisma/client";

// type TenantConfig = {
//   databaseUrl: string;
// };

// export function createPrismaClient(config: TenantConfig): PrismaClient {
//   return new PrismaClient({
//     datasources: {
//       db: {
//         url: config.databaseUrl,
//       },
//     },
//   });
// }
