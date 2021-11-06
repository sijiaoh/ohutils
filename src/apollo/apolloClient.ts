import {ApolloClient, InMemoryCache} from '@apollo/client';
// import {BatchHttpLink} from '@apollo/client/link/batch-http';

const uri = '/api/graphql';

export const apolloClient = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
  /**
   * TODO:
   * request payloadに配列が入るためか、express-graphqlではエラーが出る。
   * BatchHttpLinkはApollo特有の仕様か？
   * ApolloServerがNext.js対応したら修正する。
   */
  // link: new BatchHttpLink({uri}),

  // From: https://www.apollographql.com/docs/react/api/core/ApolloClient/#example-defaultoptions-object
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});
