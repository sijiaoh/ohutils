import path from 'path';
import {serverEnv} from 'src/generated/serverEnv';

const getDatabaseName = () => {
  const dbNameEnv = serverEnv.DB_NAME;
  if (dbNameEnv) return dbNameEnv;

  const {projectCwd} =
    require('src/utils/projectCwd') as typeof import('src/utils/projectCwd');
  const env = process.env.NODE_ENV || 'development';
  return path.basename(projectCwd).replace(/-/g, '_') + `_${env}`;
};

export const databaseConfig = {
  version: serverEnv.DB_VERSION,
  databaseName: getDatabaseName(),
  userName: serverEnv.DB_USER,
  password: serverEnv.DB_PASS,
};
