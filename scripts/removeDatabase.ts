import execa from 'execa';
import {getDatabaseName} from 'src/database/getDatabaseName';
import {serverEnv} from 'src/generated/serverEnv';

void (async () => {
  await execa(
    'yarn',
    [
      'docker-mysql',
      'rm',
      serverEnv.DB_VERSION,
      getDatabaseName(),
      '--userName',
      serverEnv.DB_USER,
      '--password',
      serverEnv.DB_PASS,
      '--volume',
    ],
    {env: process.env, stdio: 'inherit'}
  );
})();
