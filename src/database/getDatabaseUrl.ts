import {getDatabaseName} from './getDatabaseName';
import {serverEnv} from 'src/generated/serverEnv';

export const getDatabaseUrl = (newName?: string) => {
  newName = newName || getDatabaseName();
  const url = serverEnv.DB_URL;
  return url.split('/').slice(0, -1).join('/') + '/' + newName;
};
