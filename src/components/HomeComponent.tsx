import {useListen} from '@reactive-class/react';
import type {NextPage} from 'next';
import {BreadcrumbListComponent} from './BreadcrumbListComponent';
import {CounterComponent} from './CounterComponent';
import {HeadComponent} from './HeadComponent';
import {useHelloQuery} from 'src/apollo';
import {Me} from 'src/classes/Me';
import {homeBreadcrumb, homeTitle} from 'src/pages';
import {signInPath, signInTitle} from 'src/pages/signin';
import {Link} from 'src/utils/Link';

export const HomeComponent: NextPage = () => {
  const {data} = useHelloQuery();
  const me = Me.useMe();
  const token = useListen(me, i => i.data?.token);

  return (
    <div>
      <HeadComponent subTitle={homeTitle} />

      <BreadcrumbListComponent list={[homeBreadcrumb, homeBreadcrumb]} />

      <h1>
        Welcome to{' '}
        <a href="https://github.com/sijiaoh/osushi-with-auth">
          Osushi with auth!
        </a>
      </h1>

      {token ? (
        <div>Your token is {token}</div>
      ) : (
        <Link href={signInPath}>{signInTitle}</Link>
      )}

      <div>
        <Link href="#">
          <a css={{color: 'red'}}>{data?.hello}</a>
        </Link>
      </div>

      <CounterComponent css={{marginTop: '1em'}} />
    </div>
  );
};
