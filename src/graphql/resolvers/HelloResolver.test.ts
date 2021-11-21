import {HelloResolver} from '.';
import {getTestSdk} from 'test/getTestSdk';

describe(HelloResolver.name, () => {
  it('should return hello world with count', async () => {
    const sdk = getTestSdk();
    for (let i = 0; i < 5; i++) {
      const res = await sdk.helloQuery({});
      expect(res.data.hello).toBe('hello world ' + (i + 1));
    }
  });
});
