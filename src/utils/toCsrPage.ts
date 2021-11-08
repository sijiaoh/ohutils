import {NextPage} from 'next';
import dynamic from 'next/dynamic';
import {withAuth} from 'src/hocs/withAuth';
import {withNotAuth} from 'src/hocs/withNotAuth';

export const toCsrPage = (
  module: Promise<{[key: string]: NextPage}>,
  {requireAuth}: {requireAuth?: boolean} = {}
) => {
  return dynamic(
    async () => {
      const Page = Object.values(await module)[0]!;
      if (requireAuth === undefined) {
        return Page;
      } else if (requireAuth) {
        return withAuth(Page);
      } else {
        return withNotAuth(Page);
      }
    },
    {ssr: false}
  );
};
