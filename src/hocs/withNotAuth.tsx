import type {NextPage} from 'next';
import {useRouter} from 'next/dist/client/router';
import nookies from 'nookies';
import {useEffect, useMemo} from 'react';
import {tokenKey} from 'src/auth/tokenKey';
import {LoadingComponent} from 'src/components/LoadingComponent';

export const withNotAuth = (Page: NextPage): NextPage => {
  const Res: NextPage = () => {
    const router = useRouter();
    const tokenExists = useMemo(() => {
      const cookies = nookies.get();
      return cookies[tokenKey] != null;
    }, []);

    useEffect(() => {
      if (tokenExists) void router.replace('/');
    }, [router, tokenExists]);

    if (!tokenExists) {
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
