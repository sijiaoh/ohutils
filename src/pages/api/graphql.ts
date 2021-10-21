import nextConnect from 'next-connect';
import {graphqlMiddleware} from 'src/graphql/graphqlMiddleware';

const handler = nextConnect();
if (process.env.NODE_ENV === 'development') handler.get(graphqlMiddleware);
handler.post(graphqlMiddleware);

export default handler;
