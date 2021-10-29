import {graphqlMiddleware} from 'src/graphql/graphqlMiddleware';
import {getDefaultHandler} from 'src/utils/getDefaultHandler';

export const getGraphqlHandler = () => {
  const handler = getDefaultHandler();

  if (process.env.NODE_ENV === 'development') handler.get(graphqlMiddleware);
  handler.post(graphqlMiddleware);

  return handler;
};
