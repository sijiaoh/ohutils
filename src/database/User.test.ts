import {prisma} from './prisma';
import {prepareTestMysql} from 'test/prepareTestMysql';

prepareTestMysql();

describe('User', () => {
  it('Can create', async () => {
    await prisma.user.create({data: {name: 'name'}});
    expect(await prisma.user.count()).toBe(1);
  });
});
