import nextConnect from 'next-connect';
import {cookieMiddleware} from './cookieMiddleware';

export const getDefaultHandler = () => {
  const handler = nextConnect();
  handler.use(cookieMiddleware);
  return handler;
};
