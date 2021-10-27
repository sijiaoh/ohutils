import {NextApiRequest} from 'next';
import {signIn} from './signIn';
import {SocialProfileEntity, UserEntity} from 'src/database/entities';
import {buildProfile} from 'test/buildProfile';
import {createUser} from 'test/createUser';
import {emptyRequest} from 'test/emptyRequest';
import {prepareTestMysql} from 'test/prepareTestMysql';

prepareTestMysql();

describe(signIn.name, () => {
  it('can create new user', async () => {
    await signIn(emptyRequest, buildProfile(), err => {
      expect(err).toBeUndefined();
    });
    expect(await UserEntity.count()).toBe(1);
    expect(await SocialProfileEntity.count()).toBe(1);
  });

  it('can normal login', async () => {
    await createUser();

    await signIn(emptyRequest, buildProfile(), (err, user) => {
      expect(err).toBeUndefined();
      expect(user).toBeInstanceOf(UserEntity);
    });
    expect(await UserEntity.count()).toBe(1);
    expect(await SocialProfileEntity.count()).toBe(1);
  });

  it('can link other social account', async () => {
    const userId = await createUser().then(user => user.id);

    await signIn(
      {user: {id: userId}} as NextApiRequest,
      buildProfile({provider: 'twitter'}),
      (err, user) => {
        expect(err).toBeUndefined();
        expect(user).toBeTruthy();
      }
    );
    expect(await UserEntity.count()).toBe(1);
    expect(await SocialProfileEntity.count()).toBe(2);
  });

  it('can not sign in with social profile that already linked to another user', async () => {
    const userId = await createUser().then(user => user.id);
    await createUser({id: 'googleId2'});

    await signIn(
      {user: {id: userId}} as NextApiRequest,
      buildProfile({id: 'googleId2'}),
      (err, user) => {
        expect(err).toBeInstanceOf(Error);
        expect(user).toBeUndefined();
      }
    );
    expect(await UserEntity.count()).toBe(2);
    expect(await SocialProfileEntity.count()).toBe(2);
  });

  it("can not sign in with already linked provider's another profile", async () => {
    const userId = await createUser().then(user => user.id);

    await signIn(
      {user: {id: userId}} as NextApiRequest,
      buildProfile({id: 'googleId2'}),
      (err, user) => {
        expect(err).toBeInstanceOf(Error);
        expect(user).toBeUndefined();
      }
    );
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
