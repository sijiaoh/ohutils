import {UserEntity} from './UserEntity';
import {prepareMysql} from 'test/prepareTestMysql';

prepareMysql();

describe(UserEntity.name, () => {
  it('can create', async () => {
    await UserEntity.create({name: 'john'}).save();
    expect(await UserEntity.count()).toBe(1);
  });
});
