import {HelloResolver} from '.';
import {getTestSdk} from 'test/getTestSdk';
import {prepareTestMysql} from 'test/prepareTestMysql';

prepareTestMysql();

describe(HelloResolver.name, () => {
  it('should return hello world with count', async () => {
    const sdk = getTestSdk();
    for (let i = 0; i < 5; i++) {
      const res = await sdk.hello();
      expect(res.hello).toBe('hello world ' + (i + 1));
    }
  });
});
