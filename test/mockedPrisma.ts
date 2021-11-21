// From: https://www.prisma.io/docs/guides/testing/unit-testing

import type {PrismaClient} from '@prisma/client';
import {mockDeep, mockReset, DeepMockProxy} from 'jest-mock-extended';
import {prisma} from 'src/database/prisma';

jest.mock('src/database/prisma', () => ({
  __esModule: true,
  prisma: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
  mockReset(prisma);
});

export const mockedPrisma = prisma as DeepMockProxy<PrismaClient>;
