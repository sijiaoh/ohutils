import {MeResolver} from '.';
import {createUserWithSocialProfile} from 'test/createUserWithSocialProfile';
import {getSignedTestSdk} from 'test/getSignedTestSdk';
import {prepareTestMysql} from 'test/prepareTestMysql';

prepareTestMysql();

describe(MeResolver.name, () => {
  it('should return token', async () => {
    const user = await createUserWithSocialProfile();
    const sdk = await getSignedTestSdk(user);
    const res = await sdk.me();
    expect(res.me.linkedProviders).toEqual(['google']);
  });
});
