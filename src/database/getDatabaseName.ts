import {serverEnv} from 'src/generated/serverEnv';

export const getDatabaseName = () => {
  const name = serverEnv.DB_NAME;
  if (process.env.NODE_ENV === 'test')
    return name.replace(/_development$/, '_test');
  return name;
};
