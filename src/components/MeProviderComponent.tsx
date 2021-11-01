/* eslint-disable react-hooks/rules-of-hooks */

import {PropsWithChildren, useEffect, useRef} from 'react';
import {Me} from 'src/classes/Me';

export const MeProviderComponent = ({children}: PropsWithChildren<{}>) => {
  const me = useRef(new Me()).current;

  useEffect(() => {
    void me.load();
  }, [me]);

  return <Me.Context.Provider value={{me: me}}>{children}</Me.Context.Provider>;
};
