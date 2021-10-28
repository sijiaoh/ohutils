import {Profile} from 'passport';
import {buildProfile} from './buildProfile';
import {emptyRequest} from './emptyRequest';
import {signIn} from 'src/auth/signIn';

export const createUser = async (profile?: Partial<Profile>) => {
  return signIn(emptyRequest, buildProfile(profile));
};
