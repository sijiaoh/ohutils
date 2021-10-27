import execa from 'execa';
import {getConnection} from 'typeorm';
import {v4} from 'uuid';
import {connectToDatabase} from 'src/database/connectToDatabase';
import {databaseConfig} from 'src/database/databaseConfig';

export const prepareTestMysql = () => {
  const databaseName = `${databaseConfig.databaseName}-${v4()}`.replace(
    /-/g,
    '_'
  );

  beforeAll(async () => {
    await execa(
      'yarn',
      [
        'docker-mysql',
        'prepare',
        databaseConfig.version,
        databaseName,
        '--userName',
        databaseConfig.userName,
        '--password',
        databaseConfig.password,
      ],
      {env: process.env}
    );

    await connectToDatabase({database: databaseName});
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.close();

    await execa(
      'yarn',
      [
        'docker-mysql',
        'rm',
        databaseConfig.version,
        databaseName,
        '--userName',
        databaseConfig.userName,
        '--password',
        databaseConfig.password,
      ],
      {env: process.env}
    );
  });

  beforeEach(async () => {
    await getConnection().synchronize(true);
  });
};
