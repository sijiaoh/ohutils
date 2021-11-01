import {SocialProfileEntity, UserEntity} from '.';
import {createUser} from 'test/createUser';
import {prepareTestMysql} from 'test/prepareTestMysql';

prepareTestMysql();

describe(SocialProfileEntity.name, () => {
  it('will not remove user when itself removed', async () => {
    const user = await createUser();
    const socialProfiles = await SocialProfileEntity.find({
      where: {userId: user.id},
    });
    await socialProfiles[0].remove();

    expect(await UserEntity.count()).toBe(1);
    expect(await SocialProfileEntity.count()).toBe(0);
  });

  it('remove itself when user removed', async () => {
    const user = await createUser();
    await user.remove();

    expect(await UserEntity.count()).toBe(0);
    expect(await SocialProfileEntity.count()).toBe(0);
  });
});
