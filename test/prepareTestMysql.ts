import execa from 'execa';
import {v4} from 'uuid';
import {PrismaClient} from '.prisma/client';
import {getDatabaseName} from 'src/database/getDatabaseName';
import {getDatabaseUrl} from 'src/database/getDatabaseUrl';
import {getPrisma, setPrisma} from 'src/database/prisma';
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

    await execa('yarn', ['prisma', 'migrate'], {
      env: {...process.env, DB_URL: getDatabaseUrl(databaseName)},
    });

    setPrisma(
      new PrismaClient({datasources: {db: {url: getDatabaseUrl(databaseName)}}})
    );
  });

  afterAll(async () => {
    await getPrisma().$disconnect();

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
    await execa('yarn', ['prisma', 'migrate', 'reset', '--force'], {
      env: {...process.env, DB_URL: getDatabaseUrl(databaseName)},
    });
  });
};
