import execa from 'execa';
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
})();
