import {apolloClient} from './apolloClient';
import {getSdk} from 'src/generated/graphql-apollo';

export const apolloSdk = getSdk(apolloClient);
