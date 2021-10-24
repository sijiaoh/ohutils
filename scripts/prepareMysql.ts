import execa from 'execa';
import {getConnection} from 'typeorm';
import {connectToDatabase} from 'src/database/connectToDatabase';
import {databaseConfig} from 'src/database/databaseConfig';

void (async () => {
  await execa(
    'yarn',
    [
      'docker-mysql',
      'prepare',
      databaseConfig.version,
      databaseConfig.databaseName,
      databaseConfig.userName,
      databaseConfig.password,
    ],
    {env: process.env, stdio: 'inherit'}
  );

  await connectToDatabase();
  const connection = getConnection();
  await connection.close();
})();
