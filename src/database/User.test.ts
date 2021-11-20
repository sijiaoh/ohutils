import {getPrisma} from './prisma';
import {prepareTestMysql} from 'test/prepareTestMysql';

prepareTestMysql();

describe('User', () => {
  it('Can create', async () => {
    await getPrisma().user.create({data: {}});
    expect(await getPrisma().user.count()).toBe(1);
  });
});
