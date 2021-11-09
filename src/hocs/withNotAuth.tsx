/* eslint-disable react-hooks/rules-of-hooks */

import {useListen} from '@reactive-class/react';
import type {NextPage} from 'next';
import {useRouter} from 'next/dist/client/router';
import {useEffect} from 'react';
import {Me} from 'src/classes/Me';

export const withNotAuth = (Page: NextPage): NextPage => {
  const Res: NextPage = () => {
    const me = Me.useMe();
    const meData = useListen(me);
    const router = useRouter();

    useEffect(() => {
      if (me.data) void router.replace('/');
    }, [me.data, router]);

    if (meData.data === null) {
      const Element: NextPage = () => <Page />;
      return <Element />;
    } else {
      const Loading: NextPage = () => <div>Loading</div>;
      return <Loading />;
    }
  };

  return Res;
};
