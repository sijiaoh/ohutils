import {getSignedAgent} from './getSignedAgent';
import {getTestSdk} from './getTestSdk';
import {UserEntity} from 'src/database/entities';

export const getSignedTestSdk = async (user: UserEntity) => {
  return getTestSdk(await getSignedAgent(user));
};
