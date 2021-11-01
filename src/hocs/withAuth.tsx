/* eslint-disable react-hooks/rules-of-hooks */

import {useListen} from '@reactive-class/react';
import {NextPage} from 'next';
import {useRouter} from 'next/dist/client/router';
import {useEffect} from 'react';
import {Me} from 'src/classes/Me';

export const withAuth = (Page: NextPage): NextPage => {
  const Res: NextPage = () => {
    const me = Me.useMe();
    const meData = useListen(me);
    const router = useRouter();

    useEffect(() => {
      if (me.data === null) void router.replace('/');
    }, [me.data, router]);

    if (meData.data) {
      const Element: NextPage = () => <Page />;
      return <Element />;
    } else {
      const Loading: NextPage = () => <div>Loading</div>;
      return <Loading />;
    }
  };

  return Res;
};
