import nextConnect from 'next-connect';
import {cookieMiddleware} from './cookieMiddleware';
import {databaseMiddleware} from 'src/database/databaseMiddleware';

export const getDefaultHandler = () => {
  const handler = nextConnect();
  handler.use(databaseMiddleware);
  handler.use(cookieMiddleware);
  return handler;
};
