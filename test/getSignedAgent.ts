import type {User} from '@prisma/client';
import {getAgent} from './getAgent';

export const getSignedAgent = async (user: User) => {
  const agent = getAgent();
  await agent.set('Cookie', `token=${user.token}`);
  return agent;
};
