import {useListen} from '@reactive-class/react';
import type {NextPage} from 'next';
import {useRouter} from 'next/dist/client/router';
import nookies from 'nookies';
import {useEffect, useMemo} from 'react';
import {tokenKey} from 'src/auth/tokenKey';
import {Me} from 'src/classes/Me';
import {LoadingComponent} from 'src/components/LoadingComponent';

export const withAuth = (Page: NextPage): NextPage => {
  const Res: NextPage = () => {
    const {authorized, loading} = useListen(
      Me.useMe(),
      ({authorized, loading}) => ({authorized, loading})
    );
    const router = useRouter();
    const tokenExists = useMemo(() => {
      if (!loading && !authorized) return false;
      const cookies = nookies.get();
      return cookies[tokenKey] != null;
    }, [authorized, loading]);

    useEffect(() => {
      if (!tokenExists) void router.replace('/');
    }, [router, tokenExists]);

    if (tokenExists) {
      const Element: NextPage = () => <Page />;
      return <Element />;
    } else {
      const Loading: NextPage = () => (
        <LoadingComponent css={{padding: '1em 0'}} />
      );
      return <Loading />;
    }
  };

  return Res;
};
