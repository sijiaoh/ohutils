import {UserEntity} from '.';
import {prepareTestMysql} from 'test/prepareTestMysql';

prepareTestMysql();

describe(UserEntity.name, () => {
  it('can create', async () => {
    await UserEntity.create().save();
    expect(await UserEntity.count()).toBe(1);
  });

  it('socialProfiles can not use directly', async () => {
    // Remove socialProfiles duplecate when it fixed.
    const user = await UserEntity.create().save();
    await expect(async () => user.socialProfiles).rejects.toThrowError();
  });
});
