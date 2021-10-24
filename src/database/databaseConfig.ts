import path from 'path';

const getDatabaseName = () => {
  const dbNameEnv = process.env.DB_NAME;
  if (dbNameEnv) return dbNameEnv;

  const projectCwd = process.env.PROJECT_CWD;
  if (!projectCwd) throw new Error('process.env.PROJECT_CWD is falsy.');
  const env = process.env.NODE_ENV || 'development';
  return path.basename(projectCwd).replace(/-/g, '_') + `_${env}`;
};

const userName = process.env.DB_USER;
if (!userName) throw new Error('DB_USER is falsy');
const password = process.env.DB_PASS;
if (!password) throw new Error('DB_PASS is falsy');

export const databaseConfig = {
  version: '5.7',
  databaseName: getDatabaseName(),
  userName,
  password,
};
