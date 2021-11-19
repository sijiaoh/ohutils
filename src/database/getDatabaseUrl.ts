import {serverEnv} from 'src/generated/serverEnv';
import {getDatabaseName} from './getDatabaseName';

export const getDatabaseUrl = () => {
  const newName = getDatabaseName();
  const url = serverEnv.DB_URL;
  return url.split('/').slice(0, -1).join('/') + '/' + newName;
};
