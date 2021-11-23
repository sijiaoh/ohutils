import {program} from 'commander';
import {databaseUp} from './databaseUp';
import {exec} from './exec';
import {execMysql} from './execMysql';

const migrate = async () => exec('yarn prisma migrate');
const remove = async () => exec('yarn execScript scripts/removeDatabase');

program.description('Control docker-mysql');

program
  .command('up')
  .description(
    'Up docker container and create empty database and user if not.(Without migrate)'
  )
  .action(async () => {
    await databaseUp();
  });

program
  .command('migrate')
  .description('Run prisma migrate.')
  .action(async () => {
    await migrate();
  });

program
  .command('prepare')
  .description('up and migrate')
  .action(async () => {
    await databaseUp();
    await migrate();
  });

program
  .command('remove')
  .description('Remove database.')
  .action(async () => {
    await remove();
  });

program.command('reset').action(async () => {
  await exec('yarn prisma migrate reset --force');
});

program.command('exec <commands...>').action(async (commands: string[]) => {
  await execMysql(commands);
});

program.parse();
