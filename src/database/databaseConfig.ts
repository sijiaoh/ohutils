import path from 'path';

const getDatabaseName = () => {
  const dbNameEnv = process.env.DB_NAME;
  if (dbNameEnv) return dbNameEnv;

  const {projectCwd} =
    require('src/utils/projectCwd') as typeof import('src/utils/projectCwd');
  const env = process.env.NODE_ENV || 'development';
  return path.basename(projectCwd).replace(/-/g, '_') + `_${env}`;
};

const version = process.env.DB_VERSION;
if (!version) throw new Error('DB_VERSION is falsy');
const userName = process.env.DB_USER;
if (!userName) throw new Error('DB_USER is falsy');
const password = process.env.DB_PASS;
if (!password) throw new Error('DB_PASS is falsy');

export const databaseConfig = {
  version,
  databaseName: getDatabaseName(),
  userName,
  password,
};
