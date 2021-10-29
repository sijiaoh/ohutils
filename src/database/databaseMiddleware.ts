import {connectToDatabase} from './connectToDatabase';
import {Middleware} from 'src/utils/Middleware';

export const databaseMiddleware: Middleware = async (req, res, next) => {
  if (process.env.NODE_ENV === 'test') {
    next();
    return;
  }

  await connectToDatabase();
  next();
};
