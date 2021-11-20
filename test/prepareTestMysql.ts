import execa from 'execa';
import {v4} from 'uuid';
import {PrismaClient} from '.prisma/client';
import {getDatabaseName} from 'src/database/getDatabaseName';
import {getDatabaseUrl} from 'src/database/getDatabaseUrl';
import {getPrisma, setPrisma} from 'src/database/prisma';

// From: https://github.com/sijiaoh/docker-mysql/blob/main/src/index.ts#L8
const mysqlRootPassword = 'docker-mysql-root-password';

export const prepareTestMysql = () => {
  const databaseName = `${getDatabaseName()}-${v4()}`.replace(/-/g, '_');
  const databaseUrl = getDatabaseUrl({
    user: 'root',
    pass: mysqlRootPassword,
    name: databaseName,
  });

  beforeAll(() => {
    setPrisma(new PrismaClient({datasources: {db: {url: databaseUrl}}}));
  });

  afterAll(async () => {
    await getPrisma().$executeRawUnsafe(`drop database ${databaseName};`);
    await getPrisma().$disconnect();
  });

  beforeEach(async () => {
    await execa('yarn', ['prisma', 'migrate', 'reset', '--force'], {
      env: {...process.env, DB_URL: databaseUrl},
    });
  });
};
