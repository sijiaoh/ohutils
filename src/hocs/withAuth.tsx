/* eslint-disable react-hooks/rules-of-hooks */

import {useListen} from '@reactive-class/react';
import type {NextPage} from 'next';
import {useRouter} from 'next/dist/client/router';
import nookies from 'nookies';
import {useEffect, useMemo} from 'react';
import {tokenKey} from 'src/auth/tokenKey';
import {Me} from 'src/classes/Me';

export const withAuth = (Page: NextPage): NextPage => {
  const Res: NextPage = () => {
    const meData = useListen(Me.useMe());
    const router = useRouter();
    const tokenExists = useMemo(() => {
      if (meData.data === null) return false;
      const cookies = nookies.get();
      return cookies[tokenKey] != null;
    }, [meData.data]);

    useEffect(() => {
      if (!tokenExists) void router.replace('/');
    }, [router, tokenExists]);

    if (tokenExists) {
      const Element: NextPage = () => <Page />;
      return <Element />;
    } else {
      const Loading: NextPage = () => <div>Loading</div>;
      return <Loading />;
    }
  };

  return Res;
};
