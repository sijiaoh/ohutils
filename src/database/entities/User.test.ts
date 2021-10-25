import {User} from './User';
import {prepareMysql} from 'test/prepareTestMysql';

prepareMysql();

describe(User.name, () => {
  it('can create', async () => {
    await User.create({name: 'john'}).save();
    expect(await User.count()).toBe(1);
  });
});
