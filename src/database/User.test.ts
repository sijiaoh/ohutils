import {prisma} from './prisma';

import 'test/prepareTestDatabase';

describe('User', () => {
  it('Can create', async () => {
    await prisma.user.create({data: {}});
    expect(await prisma.user.count()).toBe(1);
  });
});
