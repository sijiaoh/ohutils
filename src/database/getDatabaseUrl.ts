import {getDatabaseName} from './getDatabaseName';
import {serverEnv} from 'src/generated/serverEnv';

export const getDatabaseUrl = ({
  user = serverEnv.DB_USER,
  pass = serverEnv.DB_PASS,
  host = serverEnv.DB_HOST,
  port = serverEnv.DB_PORT,
  name = getDatabaseName(),
}: {
  user?: string;
  pass?: string;
  host?: string;
  port?: string;
  name?: string;
}) => {
  return `mysql://${user}:${pass}@${host}:${port}/${name}`;
};
