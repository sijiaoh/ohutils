import {tokenKey} from './tokenKey';
import type {UserEntity} from 'src/database/entities';
import type {Response} from 'src/utils/Context';

export const createSession = (res: Response, user: UserEntity) => {
  res.cookie(tokenKey, user.token);
};
