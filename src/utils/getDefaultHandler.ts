import nextConnect from 'next-connect';
import {cookieMiddleware} from './cookieMiddleware';
import {authMiddleware} from 'src/auth/authMiddleware';

export const getDefaultHandler = () => {
  const handler = nextConnect();
  handler.use(cookieMiddleware);
  handler.use(authMiddleware);
  return handler;
};
