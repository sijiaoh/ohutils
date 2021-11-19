import {ConnectionOptions, createConnection, getConnection} from 'typeorm';
import * as entities from './entities';
import {getDatabaseName} from './getDatabaseName';
import {serverEnv} from 'src/generated/serverEnv';

export const connectToDatabase = async (
  options?: Partial<ConnectionOptions>
) => {
  // Remove old connection.
  try {
    const connection = getConnection();
    await connection.close();
    // eslint-disable-next-line no-empty
  } catch {}

  const connect = async () => {
    await createConnection({
      type: 'mysql',
      host: serverEnv.DB_HOST,
      port: parseInt(serverEnv.DB_PORT),
      database: getDatabaseName(),
      username: serverEnv.DB_USER,
      password: serverEnv.DB_PASS,
      entities: Object.values(entities),
      synchronize: process.env.NODE_ENV !== 'production',
      charset: 'utf8mb4',
      timezone: 'Z',
      ...options,
    } as ConnectionOptions).catch(async e => {
      if (process.env.NODE_ENV !== 'development') throw e;
      else await connect();
    });
  };
  await connect();
};
