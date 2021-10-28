import execa from 'execa';
import {getConnection} from 'typeorm';
import {connectToDatabase} from 'src/database/connectToDatabase';
import {databaseConfig} from 'src/database/databaseConfig';

void (async () => {
  await execa(
    'yarn',
    [
      'docker-mysql',
      'rm',
      databaseConfig.version,
      databaseConfig.databaseName,
      '--userName',
      databaseConfig.userName,
      '--password',
      databaseConfig.password,
      '--volume',
    ],
    {env: process.env, stdio: 'inherit'}
  );

  await connectToDatabase();
  const connection = getConnection();
  await connection.close();
})();
