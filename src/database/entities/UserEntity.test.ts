import {UserEntity} from './UserEntity';
import {prepareTestMysql} from 'test/prepareTestMysql';

prepareTestMysql();

describe(UserEntity.name, () => {
  it('can create', async () => {
    await UserEntity.create({name: 'john'}).save();
    expect(await UserEntity.count()).toBe(1);
  });
});
