import {ApolloProvider} from '@apollo/client';
import type {AppProps} from 'next/app';
import {apolloClient} from 'src/apollo';
import {MeProviderComponent} from 'src/components/MeProviderComponent';

const MyApp = ({Component, pageProps}: AppProps) => {
  return (
    <ApolloProvider client={apolloClient}>
      <MeProviderComponent>
        <Component {...pageProps} />
      </MeProviderComponent>
    </ApolloProvider>
  );
};

export default MyApp;
