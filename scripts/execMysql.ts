import execa from 'execa';
import {getDatabaseName} from 'src/database/getDatabaseName';
import {serverEnv} from 'src/generated/serverEnv';

export const execMysql = async (commands: string[]) => {
  const command = commands.join(' ');

  await execa(
    'yarn',
    [
      'docker-mysql',
      'exec',
      serverEnv.DB_VERSION,
      '--databaseName',
      getDatabaseName(),
      '--userName',
      serverEnv.DB_USER,
      '--password',
      serverEnv.DB_PASS,
      command,
    ],
    {env: process.env, stdio: 'inherit'}
  );
};
