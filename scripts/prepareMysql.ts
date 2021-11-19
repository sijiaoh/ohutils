import execa from 'execa';
import {getConnection} from 'typeorm';
import {connectToDatabase} from 'src/database/connectToDatabase';
import {getDatabaseName} from 'src/database/getDatabaseName';
import {serverEnv} from 'src/generated/serverEnv';

void (async () => {
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

  await connectToDatabase();
  const connection = getConnection();
  await connection.close();
})();
