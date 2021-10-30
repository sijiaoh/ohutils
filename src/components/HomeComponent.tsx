import type {NextPage} from 'next';
import {CounterComponent} from './CounterComponent';
import {HeadComponent} from './HeadComponent';
import {useHelloQuery} from 'src/apollo';
import {Link} from 'src/utils/Link';

export const HomeComponent: NextPage = () => {
  const {data} = useHelloQuery();

  return (
    <div>
      <HeadComponent subTitle={'Home'} />

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
