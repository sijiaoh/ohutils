// From: https://www.prisma.io/docs/guides/testing/unit-testing

import type {PrismaClient} from '@prisma/client';
import {mockDeep, mockReset, DeepMockProxy} from 'jest-mock-extended';
import {getPrisma} from 'src/database/prisma';

jest.mock('src/database/prisma', () => ({
  __esModule: true,
  getPrisma: () => mockDeep<PrismaClient>(),
}));

beforeEach(() => {
  mockReset(getMockedPrisma());
});

export const getMockedPrisma = getPrisma as () => DeepMockProxy<PrismaClient>;
