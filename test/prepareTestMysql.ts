import execa from 'execa';
import {v4} from 'uuid';
import {getDatabaseName} from 'src/database/getDatabaseName';
import {serverEnv} from 'src/generated/serverEnv';

export const prepareTestMysql = () => {
  const databaseName = `${getDatabaseName()}-${v4()}`.replace(/-/g, '_');

  beforeAll(async () => {
    await execa(
      'yarn',
      [
        'docker-mysql',
        'prepare',
        serverEnv.DB_VERSION,
        databaseName,
        '--userName',
        serverEnv.DB_USER,
        '--password',
        serverEnv.DB_PASS,
      ],
      {env: process.env, stdio: 'inherit'}
    );

    // TODO: Connect to database.
  });

  afterAll(async () => {
    // TODO: Close connect.

    await execa(
      'yarn',
      [
        'docker-mysql',
        'rm',
        serverEnv.DB_VERSION,
        databaseName,
        '--userName',
        serverEnv.DB_USER,
        '--password',
        serverEnv.DB_PASS,
      ],
      {env: process.env, stdio: 'inherit'}
    );
  });

  beforeEach(async () => {
    // Reset database.
  });
};
