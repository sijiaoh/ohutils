import {NextPage} from 'next';
import dynamic from 'next/dynamic';

export const toCsrPage = (module: Promise<{[key: string]: NextPage}>) => {
  return dynamic(async () => Object.values(await module)[0]!, {ssr: false});
};
