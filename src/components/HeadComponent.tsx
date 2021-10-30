import Head from 'next/head';

export const HeadComponent = ({subTitle}: {subTitle?: string}) => (
  <Head>
    <title>{subTitle && `${subTitle} | `}ohutils.com</title>
    <link rel="icon" href="/favicon.ico" />
  </Head>
);
