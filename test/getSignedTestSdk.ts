import {getSignedAgent} from './getSignedAgent';
import {getTestSdk} from './getTestSdk';
import type {UserEntity} from 'src/database/entities';

export const getSignedTestSdk = async (user: UserEntity) => {
  return getTestSdk(await getSignedAgent(user));
};
