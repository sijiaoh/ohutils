import {NextApiRequest as Base} from 'next';
import {UserEntity} from 'src/database/entities';

declare module 'next' {
  export interface NextApiRequest extends Base {
    user: UserEntity;
  }
}
