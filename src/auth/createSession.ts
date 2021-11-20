import type {User} from '@prisma/client';
import {tokenKey} from './tokenKey';
import type {Response} from 'src/utils/Context';

export const createSession = (res: Response, user: User) => {
  res.cookie(tokenKey, user.token);
};
