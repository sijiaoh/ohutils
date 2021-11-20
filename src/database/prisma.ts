import {PrismaClient} from '@prisma/client';

let store: PrismaClient | undefined = undefined;

export const getPrisma = () => {
  if (store == null) store = new PrismaClient();
  return store;
};

export const setPrisma = (prisma: PrismaClient) => {
  store = prisma;
};
