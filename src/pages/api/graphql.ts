import {graphqlMiddleware} from 'src/graphql/graphqlMiddleware';
import {handler} from 'src/utils/handler';

if (process.env.NODE_ENV === 'development') handler.get(graphqlMiddleware);
handler.post(graphqlMiddleware);

export default handler;
