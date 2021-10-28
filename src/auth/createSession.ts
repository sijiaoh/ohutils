import {UserEntity} from 'src/database/entities';
import {Response} from 'src/utils/Context';

export const createSession = (res: Response, user: UserEntity) => {
  res.cookie('token', user.token);
};
