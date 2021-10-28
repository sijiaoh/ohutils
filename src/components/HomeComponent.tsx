import type {NextPage} from 'next';
import Head from 'next/head';

export const HomeComponent: NextPage = () => {
  return (
    <div>
      <Head>
        <title>ohutils.com</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>
        Welcome to <a href="https://github.com/sijiaoh/ohutils">ohutils.com!</a>
      </h1>
    </div>
  );
};
