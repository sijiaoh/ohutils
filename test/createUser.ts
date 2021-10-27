import {Profile} from 'passport';
import {buildProfile} from './buildProfile';
import {emptyRequest} from './emptyRequest';
import {signIn} from 'src/auth/signIn';
import {UserEntity} from 'src/database/entities';

export const createUser = async (profile?: Partial<Profile>) => {
  return new Promise<UserEntity>((resolve, reject) => {
    void signIn(emptyRequest, buildProfile(profile), (err, user) => {
      if (err || !user) {
        reject(err);
        return;
      }
      resolve(user);
    }).catch(err => {
      reject(err);
    });
  });
};
