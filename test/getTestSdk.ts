import {ApolloClient, NetworkStatus} from '@apollo/client';
import {print} from 'graphql';
import type {SuperAgentTest} from 'supertest';
import {getAgent} from './getAgent';
import {getSdk} from 'src/generated/graphql-apollo';

export const getTestSdk = (agent?: SuperAgentTest) => {
  agent = agent || getAgent();

  const query: ApolloClient<unknown>['query'] = async ({query, variables}) => {
    const res = await agent!
      .post('/api/graphql')
      .send({query: print(query), variables});

    return {
      data: res.body.data,
      errors: res.body.errors,
      error: res.body.error,
      loading: false,
      networkStatus: NetworkStatus.ready,
    };
  };

  return getSdk({
    query: async props => {
      return query(props);
    },
    mutate: async props => {
      return query({...props, query: props.mutation});
    },
  } as Pick<ApolloClient<unknown>, 'query' | 'mutate'> as ApolloClient<unknown>);
};
