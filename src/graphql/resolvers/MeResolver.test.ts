import {MeResolver} from '.';
import {createUserWithSocialProfile} from 'test/createUserWithSocialProfile';
import {getSignedTestSdk} from 'test/getSignedTestSdk';

import 'test/prepareTestDatabase';

describe(MeResolver.name, () => {
  it('should return token', async () => {
    const user = await createUserWithSocialProfile();
    const sdk = await getSignedTestSdk(user);
    const res = await sdk.meQuery({});
    expect(res.data.me.linkedProviders).toEqual(['google']);
  });
});
