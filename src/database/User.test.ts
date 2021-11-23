import {prisma} from './prisma';
import {prepareTestDatabase} from 'test/prepareTestDatabase';

prepareTestDatabase();

describe('User', () => {
  it('Can create', async () => {
    await prisma.user.create({data: {name: 'name'}});
    expect(await prisma.user.count()).toBe(1);
  });
});
