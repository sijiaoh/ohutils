import {NextApiRequest, NextApiResponse} from 'next';
import {Middleware} from 'next-connect';
import {connectToDatabase} from './connectToDatabase';

export const databaseMiddleware: Middleware<NextApiRequest, NextApiResponse> =
  async (req, res, next) => {
    await connectToDatabase();
    next();
  };
