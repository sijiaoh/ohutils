import execa from 'execa';
import {v4} from 'uuid';
import {getDatabaseName} from 'src/database/getDatabaseName';
import {getDatabaseUrl} from 'src/database/getDatabaseUrl';
import {prisma} from 'src/database/prisma';

// From: https://github.com/sijiaoh/docker-mysql/blob/main/src/index.ts#L8
const mysqlRootPassword = 'docker-mysql-root-password';

const databaseName = `${getDatabaseName()}-${v4()}`.replace(/-/g, '_');
const databaseUrl = getDatabaseUrl({
  user: 'root',
  pass: mysqlRootPassword,
  name: databaseName,
});

beforeAll(() => {
  process.env.DB_URL = databaseUrl;
});

afterAll(async () => {
  await prisma.$executeRawUnsafe(`drop database ${databaseName};`);
  await prisma.$disconnect();
});

beforeEach(async () => {
  await execa('yarn', ['prisma', 'migrate', 'reset', '--force'], {
    env: {...process.env, DB_URL: databaseUrl},
  });
});
