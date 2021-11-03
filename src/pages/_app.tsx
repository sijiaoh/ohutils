import 'sanitize.css';
import 'sanitize.css/forms.css';
import 'sanitize.css/typography.css';

import {ApolloProvider} from '@apollo/client';
import type {AppProps} from 'next/app';
import {apolloClient} from 'src/apollo';
import {MeProviderComponent} from 'src/components/MeProviderComponent';
import {useAnalytics} from 'src/utils/analytics';

const MyApp = ({Component, pageProps}: AppProps) => {
  useAnalytics();

  return (
    <ApolloProvider client={apolloClient}>
      <MeProviderComponent>
        <Component {...pageProps} />
      </MeProviderComponent>
    </ApolloProvider>
  );
};

export default MyApp;
