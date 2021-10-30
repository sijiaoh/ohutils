import Head from 'next/head';

export const HeadComponent = ({subTitle}: {subTitle?: string}) => (
  <Head>
    <title>{subTitle && `${subTitle} | `}Osushi with auth</title>
    <meta
      name="description"
      content="next.js + typescript + graphql + apollo + reactive-class template"
    />
    <link rel="icon" href="/favicon.ico" />
  </Head>
);
