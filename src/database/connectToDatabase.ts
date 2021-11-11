import {ConnectionOptions, createConnection, getConnection} from 'typeorm';
import {databaseConfig} from './databaseConfig';
import * as entities from './entities';
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
      database: databaseConfig.databaseName,
      username: databaseConfig.userName,
      password: databaseConfig.password,
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
