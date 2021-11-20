import type {User} from '@prisma/client';
import {getSignedAgent} from './getSignedAgent';
import {getTestSdk} from './getTestSdk';

export const getSignedTestSdk = async (user: User) => {
  return getTestSdk(await getSignedAgent(user));
};
