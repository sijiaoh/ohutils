import {UserEntity} from '.';
import {prepareTestMysql} from 'test/prepareTestMysql';

prepareTestMysql();

describe(UserEntity.name, () => {
  it('can create', async () => {
    await UserEntity.build().save();
    expect(await UserEntity.count()).toBe(1);
  });
});
