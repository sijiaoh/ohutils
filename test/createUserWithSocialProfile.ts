import type {Profile} from 'passport';
import {v4} from 'uuid';
import {buildProfile} from './buildProfile';
import {emptyRequest} from './emptyRequest';
import {signIn} from 'src/auth/signIn';

export const createUserWithSocialProfile = async (
  profile?: Partial<Profile>
) => {
  return signIn(emptyRequest, buildProfile({id: v4(), ...profile}));
};
