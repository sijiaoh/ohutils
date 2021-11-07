import {ReactiveClass} from '@reactive-class/react';
import {createContext, useContext} from 'react';
import {apolloSdk, MeType} from 'src/apollo';

export class Me extends ReactiveClass {
  static Context = createContext<{me?: Me}>({});
  static useMe = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const me = useContext(this.Context)?.me;
    if (!me) throw new Error(`${Me.name} not provided.`);
    return me;
  };

  /** undefined is fetching, null is unauthorized */
  data?: MeType | null;

  load = async () => {
    this.data = await apolloSdk
      .meQuery({})
      .then(({data}) => data.me)
      .catch(() => null);
  };
}
