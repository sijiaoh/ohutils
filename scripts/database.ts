import {program} from 'commander';
import {databaseUp} from './databaseUp';
import {exec} from './exec';
import {execMysql} from './execMysql';

const migrate = () => exec('yarn prisma migrate');
const remove = () => exec('yarn execScript scripts/removeDatabase');

program.description('Control docker-mysql');

program.command('up').action(async () => {
  await databaseUp();
});

program.command('migrate').action(async () => {
  await migrate();
});

program.command('prepare').action(async () => {
  await databaseUp();
  await migrate();
});

program.command('remove').action(async () => {
  await remove();
});

program.command('reset').action(async () => {
  await remove();
  await databaseUp();
  await migrate();
});

program.command('exec <commands...>').action(async (commands: string[]) => {
  execMysql(commands);
});

program.parse();
