import {PrismaClient} from '@prisma/client';
import {serverEnv} from 'src/generated/serverEnv';

// For lambda deploy.
process.env.DB_URL = serverEnv.DB_URL;
export const prisma = new PrismaClient();
