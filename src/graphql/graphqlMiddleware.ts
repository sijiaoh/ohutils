import {graphqlHTTP} from 'express-graphql';
import {buildSchema} from './buildSchema';
import type {Middleware} from 'src/utils/Middleware';

export const graphqlMiddleware: Middleware = async (req, res, next) => {
  await graphqlHTTP({
    schema: buildSchema(),
    graphiql: process.env.NODE_ENV === 'development',
    context: {req, res},
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  })(req as any, res);
  next();
};
