import nextConnect from 'next-connect';
import {cookieMiddleware} from './cookieMiddleware';
import {authMiddleware} from 'src/auth/authMiddleware';
import {databaseMiddleware} from 'src/database/databaseMiddleware';

const handler = nextConnect();
handler.use(databaseMiddleware);
handler.use(cookieMiddleware);
handler.use(authMiddleware);

export {handler};
