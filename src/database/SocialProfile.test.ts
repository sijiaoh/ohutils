import {prisma} from './prisma';
import {createUserWithSocialProfile} from 'test/createUserWithSocialProfile';
import {prepareTestMysql} from 'test/prepareTestMysql';

prepareTestMysql();

describe('SocialProfile', () => {
  it('will not remove user when itself removed', async () => {
    const user = await createUserWithSocialProfile();
    const socialProfile = await prisma.socialProfile.findFirst({
      where: {userId: user.id},
    });
    await prisma.socialProfile.delete({where: {id: socialProfile!.id}});

    expect(await prisma.user.count()).toBe(1);
    expect(await prisma.socialProfile.count()).toBe(0);
  });

  it('remove itself when user removed', async () => {
    const user = await createUserWithSocialProfile();
    await prisma.user.delete({where: {id: user.id}});

    expect(await prisma.user.count()).toBe(0);
    expect(await prisma.socialProfile.count()).toBe(0);
  });
});
