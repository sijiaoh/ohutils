import {signIn} from './signIn';
import {SocialProfileEntity, UserEntity} from 'src/database/entities';
import {Request} from 'src/utils/Context';
import {buildProfile} from 'test/buildProfile';
import {createUser} from 'test/createUser';
import {emptyRequest} from 'test/emptyRequest';
import {prepareTestMysql} from 'test/prepareTestMysql';

prepareTestMysql();

describe(signIn.name, () => {
  it('can create new user', async () => {
    await expect(
      signIn(emptyRequest, buildProfile())
    ).resolves.not.toThrowError();
    expect(await UserEntity.count()).toBe(1);
    expect(await SocialProfileEntity.count()).toBe(1);
  });

  it('can normal login', async () => {
    await createUser();

    const user = await signIn(emptyRequest, buildProfile());
    expect(user).toBeInstanceOf(UserEntity);
    expect(await UserEntity.count()).toBe(1);
    expect(await SocialProfileEntity.count()).toBe(1);
  });

  it('can link other social account', async () => {
    const userId = await createUser().then(user => user.id);

    const user = await signIn(
      {user: {id: userId}} as Request,
      buildProfile({provider: 'twitter'})
    );
    expect(user).toBeTruthy();
    expect(await UserEntity.count()).toBe(1);
    expect(await SocialProfileEntity.count()).toBe(2);
  });

  it('can not sign in with social profile that already linked to another user', async () => {
    const userId = await createUser().then(user => user.id);
    await createUser({id: 'googleId2'});

    await expect(
      signIn({user: {id: userId}} as Request, buildProfile({id: 'googleId2'}))
    ).rejects.toThrowError();
    expect(await UserEntity.count()).toBe(2);
    expect(await SocialProfileEntity.count()).toBe(2);
  });

  it("can not sign in with already linked provider's another profile", async () => {
    const userId = await createUser().then(user => user.id);

    await expect(
      signIn({user: {id: userId}} as Request, buildProfile({id: 'googleId2'}))
    ).rejects.toThrowError();
    expect(await UserEntity.count()).toBe(1);
    expect(await SocialProfileEntity.count()).toBe(1);
  });

  it('can sign in without emails', async () => {
    await expect(createUser({emails: undefined})).resolves.not.toThrowError();
    await expect(
      createUser({id: 'googleId2', emails: []})
    ).resolves.not.toThrowError();
  });
});
