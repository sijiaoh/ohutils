import execa from 'execa';
import {databaseConfig} from 'src/database/databaseConfig';

void (async () => {
  const command = process.argv.slice(2).join(' ');

  await execa(
    'yarn',
    [
      'docker-mysql',
      'exec',
      databaseConfig.version,
      '--databaseName',
      databaseConfig.databaseName,
      '--userName',
      databaseConfig.userName,
      '--password',
      databaseConfig.password,
      command,
    ],
    {env: process.env, stdio: 'inherit'}
  );
})();
