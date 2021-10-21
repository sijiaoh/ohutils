import {graphqlHTTP} from 'express-graphql';
import {buildSchema} from './buildSchema';

export const graphqlMiddleware = graphqlHTTP({
  schema: buildSchema(),
  graphiql: process.env.NODE_ENV === 'development',
});
