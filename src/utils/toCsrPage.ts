import {NextPage} from 'next';
import dynamic from 'next/dynamic';

export const toCsrPage = (page: NextPage) => {
  return dynamic(async () => Promise.resolve(page), {ssr: false});
};
