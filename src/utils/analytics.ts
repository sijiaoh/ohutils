// From: https://github.com/vercel/next.js/tree/master/examples/with-react-ga

import {useRouter} from 'next/dist/client/router';
import {useEffect} from 'react';
import {initialize, set, pageview, event, exception} from 'react-ga';

export const useAnalytics = () => {
  const router = useRouter();

  useEffect(() => {
    initGA();
    if (!router.asPath.includes('?')) {
      logPageView();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    router.events.on('routeChangeComplete', logPageView);
    return () => {
      router.events.off('routeChangeComplete', logPageView);
    };
  }, [router.events]);
};

export const initGA = () => {
  const trackingCode = process.env.NEXT_PUBLIC_TRACKING_CODE;
  initialize(trackingCode || '', {
    debug: process.env.NODE_ENV !== 'production' || trackingCode == null,
  });
};

export const logPageView = () => {
  set({page: window.location.pathname});
  pageview(window.location.pathname);
};

export const logEvent = (category = '', action = '') => {
  if (category && action) {
    event({category, action});
  }
};

export const logException = (description = '', fatal = false) => {
  if (description) {
    exception({description, fatal});
  }
};
