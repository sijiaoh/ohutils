import {apolloClient} from '.';
import {getSdk} from 'src/generated/graphql-apollo';

export const apolloSdk = getSdk(apolloClient);
