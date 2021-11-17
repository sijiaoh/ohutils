import {UserEntity} from './UserEntity';
import {prepareTestMysql} from 'test/prepareTestMysql';

prepareTestMysql();

describe(UserEntity.name, () => {
  it('can create', async () => {
    await UserEntity.build({name: 'name'}).save();
    expect(await UserEntity.count()).toBe(1);
  });
});
