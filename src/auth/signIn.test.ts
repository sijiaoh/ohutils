import {signIn} from './signIn';
import {prisma} from 'src/database/prisma';
import type {Request} from 'src/utils/Context';
import {buildProfile} from 'test/buildProfile';
import {createUserWithSocialProfile} from 'test/createUserWithSocialProfile';
import {emptyRequest} from 'test/emptyRequest';
import {prepareTestMysql} from 'test/prepareTestMysql';

prepareTestMysql();

describe(signIn.name, () => {
  it('can create new user', async () => {
    await expect(
      signIn(emptyRequest, buildProfile())
    ).resolves.not.toThrowError();
    expect(await prisma.user.count()).toBe(1);
    expect(await prisma.socialProfile.count()).toBe(1);
  });

  it('can normal login', async () => {
    await createUserWithSocialProfile(buildProfile());

    const user = await signIn(emptyRequest, buildProfile());
    expect(user.id).toBe((await prisma.user.findFirst())?.id);
    expect(await prisma.user.count()).toBe(1);
    expect(await prisma.socialProfile.count()).toBe(1);
  });

  it('can link other social account', async () => {
    const userId = await createUserWithSocialProfile().then(user => user.id);

    const user = await signIn(
      {user: {id: userId}} as Request,
      buildProfile({provider: 'twitter'})
    );
    expect(user).toBeTruthy();
    expect(await prisma.user.count()).toBe(1);
    expect(await prisma.socialProfile.count()).toBe(2);
  });

  it('can not sign in with social profile that already linked to another user', async () => {
    const userId = await createUserWithSocialProfile().then(user => user.id);
    await createUserWithSocialProfile({id: 'googleId2'});

    await expect(
      signIn({user: {id: userId}} as Request, buildProfile({id: 'googleId2'}))
    ).rejects.toThrowError();
    expect(await prisma.user.count()).toBe(2);
    expect(await prisma.socialProfile.count()).toBe(2);
  });

  it("can not sign in with already linked provider's another profile", async () => {
    const userId = await createUserWithSocialProfile().then(user => user.id);

    await expect(
      signIn({user: {id: userId}} as Request, buildProfile({id: 'googleId2'}))
    ).rejects.toThrowError();
    expect(await prisma.user.count()).toBe(1);
    expect(await prisma.socialProfile.count()).toBe(1);
  });

  it('can sign in without emails', async () => {
    await expect(
      createUserWithSocialProfile({emails: undefined})
    ).resolves.not.toThrowError();
    await expect(
      createUserWithSocialProfile({id: 'googleId2', emails: []})
    ).resolves.not.toThrowError();
  });
});
