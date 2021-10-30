import 'sanitize.css';
import 'sanitize.css/forms.css';
import 'sanitize.css/typography.css';

import {ApolloProvider} from '@apollo/client';
import type {AppProps} from 'next/app';
import {apolloClient} from 'src/apollo';

const MyApp = ({Component, pageProps}: AppProps) => {
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default MyApp;
