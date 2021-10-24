import nextConnect from 'next-connect';
import {databaseMiddleware} from 'src/database/databaseMiddleware';
import {graphqlMiddleware} from 'src/graphql/graphqlMiddleware';

const handler = nextConnect();
handler.use(databaseMiddleware);
if (process.env.NODE_ENV === 'development') handler.get(graphqlMiddleware);
handler.post(graphqlMiddleware);

export default handler;
