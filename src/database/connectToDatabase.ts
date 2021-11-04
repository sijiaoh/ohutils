import {ConnectionOptions, createConnection, getConnection} from 'typeorm';
import {databaseConfig} from './databaseConfig';
import * as entities from './entities';

export const connectToDatabase = async (
  options?: Partial<ConnectionOptions>
) => {
  // Remove old connection.
  try {
    const connection = getConnection();
    await connection.close();
    // eslint-disable-next-line no-empty
  } catch {}

  await createConnection({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '') || undefined,
    database: databaseConfig.databaseName,
    username: databaseConfig.userName,
    password: databaseConfig.password,
    entities: Object.values(entities),
    synchronize: process.env.NODE_ENV !== 'production',
    charset: 'utf8mb4',
    timezone: 'Z',
    ...options,
  } as ConnectionOptions);
};
