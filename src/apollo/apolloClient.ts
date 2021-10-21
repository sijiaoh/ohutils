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
});
