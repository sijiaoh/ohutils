import 'bootstrap/dist/css/bootstrap.min.css';

import {ApolloProvider} from '@apollo/client';
import type {AppProps} from 'next/app';
import {apolloClient} from 'src/apollo';
import {HeaderComponent} from 'src/components/HeaderComponent';
import {MeProviderComponent} from 'src/components/MeProviderComponent';
import {useAnalytics} from 'src/utils/analytics';

const MyApp = ({Component, pageProps}: AppProps) => {
  useAnalytics();

  return (
    <ApolloProvider client={apolloClient}>
      <MeProviderComponent>
        <HeaderComponent />
        <Component {...pageProps} />
      </MeProviderComponent>
    </ApolloProvider>
  );
};

export default MyApp;
