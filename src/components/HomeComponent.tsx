import type {NextPage} from 'next';
import {BreadcrumbComponent} from './BreadcrumbComponent';
import {CounterComponent} from './CounterComponent';
import {HeadComponent} from './HeadComponent';
import {useHelloQuery} from 'src/apollo';
import {Link} from 'src/utils/Link';

export const homeTitle = 'Home';
export const homePath = '/';

export const HomeComponent: NextPage = () => {
  const {data} = useHelloQuery();

  return (
    <div>
      <HeadComponent subTitle={homeTitle} />

      <BreadcrumbComponent
        list={[
          {title: homeTitle, path: homePath},
          {title: homeTitle, path: homePath},
        ]}
      />

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
