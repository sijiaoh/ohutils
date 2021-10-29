import {getAgent} from './getAgent';
import {UserEntity} from 'src/database/entities';

export const getSignedAgent = async (user: UserEntity) => {
  const agent = getAgent();
  await agent.set('Cookie', `token=${user.token}`);
  return agent;
};
