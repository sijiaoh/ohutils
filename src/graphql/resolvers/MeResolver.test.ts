import {MeResolver} from '.';
import {createUser} from 'test/createUser';
import {getSignedTestSdk} from 'test/getSignedTestSdk';
import {prepareTestMysql} from 'test/prepareTestMysql';

prepareTestMysql();

describe(MeResolver.name, () => {
  it('should return token', async () => {
    const user = await createUser();
    const sdk = await getSignedTestSdk(user);
    const res = await sdk.me();
    expect(res.me.linkedProviders).toEqual(['google']);
  });
});
