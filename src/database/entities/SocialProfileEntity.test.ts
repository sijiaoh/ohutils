import {SocialProfileEntity, UserEntity} from '.';
import {createUserWithSocialProfile} from 'test/createUserWithSocialProfile';
import {prepareTestMysql} from 'test/prepareTestMysql';

prepareTestMysql();

describe(SocialProfileEntity.name, () => {
  it('will not remove user when itself removed', async () => {
    const user = await createUserWithSocialProfile();
    const socialProfiles = await SocialProfileEntity.find({
      where: {userId: user.id},
    });
    await socialProfiles[0]!.remove();

    expect(await UserEntity.count()).toBe(1);
    expect(await SocialProfileEntity.count()).toBe(0);
  });

  it('remove itself when user removed', async () => {
    const user = await createUserWithSocialProfile();
    await user.remove();

    expect(await UserEntity.count()).toBe(0);
    expect(await SocialProfileEntity.count()).toBe(0);
  });
});
