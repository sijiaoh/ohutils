import {ReactiveClass} from '@reactive-class/react';
import nookies from 'nookies';
import {createContext, useContext} from 'react';
import {apolloSdk, MeType} from 'src/apollo';
import {tokenKey} from 'src/auth/tokenKey';

export class Me extends ReactiveClass {
  static Context = createContext<{me?: Me}>({});
  static useMe = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const me = useContext(this.Context)?.me;
    if (!me) throw new Error(`${Me.name} not provided.`);
    return me;
  };

  loading = true;
  authorized = false;
  /** undefined is fetching, null is unauthorized */
  data?: MeType | null;

  load = async () => {
    this.loading = true;
    this.authorized = false;

    this.data = await apolloSdk
      .meQuery({})
      .then(({data}) => data.me)
      .catch(() => null);

    if (this.data) this.authorized = true;
    this.loading = false;
  };

  signOut = () => {
    nookies.destroy(undefined, tokenKey);
    this.authorized = false;
    this.data = null;
  };
}
