import type {NextPage} from 'next';
import {BreadcrumbListComponent} from './BreadcrumbListComponent';
import {CounterComponent} from './CounterComponent';
import {HeadComponent} from './HeadComponent';
import {useHelloQuery} from 'src/apollo';
import {Link} from 'src/utils/Link';
import {homeBreadcrumb, homeTitle} from 'src/utils/pageHelpers';

export const HomeComponent: NextPage = () => {
  const {data} = useHelloQuery();

  return (
    <div>
      <HeadComponent subTitle={homeTitle} />

      <BreadcrumbListComponent list={[homeBreadcrumb, homeBreadcrumb]} />

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
