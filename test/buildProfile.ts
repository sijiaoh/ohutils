import {Profile} from 'passport';

export const buildProfile = (options?: Partial<Profile>): Profile => ({
  provider: 'google',
  id: 'googleId',
  displayName: 'john',
  emails: [{value: 'john@osushi.com'}],
  ...options,
});
