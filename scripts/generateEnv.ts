import fs from 'fs';
import {EOL} from 'os';

const serverEnvNames: string[] = [
  'DB_VERSION',
  'DB_HOST',
  'DB_PORT',
  // Use `${basename(PROJECT_CWD)}_${NODE_ENV} if empty.
  'DB_NAME',
  'DB_USER',
  'DB_PASS',
];
const clientEnvNames: string[] = [
  // Google analytics.
  'NEXT_PUBLIC_TRACKING_CODE',
];

const generate = (fileName: string, envNames: string[], isServer: boolean) => {
  const body = envNames
    .map(envName => {
      const env = process.env[envName];
      if (env == null)
        throw new Error(`process.env.${envName} is required but not provide.`);
      return `${envName}: '${env}',`;
    })
    .join(EOL);

  const file = [
    '/* eslint-disable */',
    '// prettier-ignore',

    isServer
      ? `if(typeof window !== 'undefined')throw new Error('Do not import ${fileName} from client.');`
      : '',

    `export const ${fileName} = {`,
    body,
    '};',
  ].join(EOL);

  fs.writeFileSync(`src/generated/${fileName}.ts`, file);
};

fs.mkdirSync('src/generated', {recursive: true});

generate('serverEnv', serverEnvNames, true);
generate('clientEnv', clientEnvNames, false);
