import {connectToDatabase} from './connectToDatabase';
import {Middleware} from 'src/utils/Middleware';

export const databaseMiddleware: Middleware = async (req, res, next) => {
  await connectToDatabase();
  next();
};
