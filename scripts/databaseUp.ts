import execa from 'execa';
import {getDatabaseName} from 'src/database/getDatabaseName';
import {serverEnv} from 'src/generated/serverEnv';

export const databaseUp = async () => {
  await execa(
    'yarn',
    [
      'docker-mysql',
      'prepare',
      serverEnv.DB_VERSION,
      getDatabaseName(),
      '--userName',
      serverEnv.DB_USER,
      '--password',
      serverEnv.DB_PASS,
    ],
    {env: process.env, stdio: 'inherit'}
  );

  await execa(
    'yarn',
    [
      'docker-mysql',
      'prepare',
      serverEnv.DB_VERSION,
      `${getDatabaseName()}_shadow`,
      '--userName',
      serverEnv.DB_USER,
      '--password',
      serverEnv.DB_PASS,
    ],
    {env: process.env, stdio: 'inherit'}
  );
};
