import type {NextPage} from 'next';
import Head from 'next/head';
import {CounterComponent} from './CounterComponent';
import {useHelloQuery} from 'src/apollo';
import {Link} from 'src/utils/Link';

export const HomeComponent: NextPage = () => {
  const {data} = useHelloQuery();

  return (
    <div>
      <Head>
        <title>Osushi</title>
        <meta
          name="description"
          content="next.js + typescript + graphql + apollo + reactive-class template"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>
        Welcome to <a href="https://github.com/sijiaoh/osushi">Osushi!</a>
      </h1>

      <Link href="#">
        <a css={{color: 'red'}}>{data?.hello}</a>
      </Link>

      <CounterComponent css={{marginTop: '1em'}} />
    </div>
  );
};
