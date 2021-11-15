import {useListen} from '@reactive-class/react';
import type {NextPage} from 'next';
import {BreadcrumbListComponent} from './BreadcrumbListComponent';
import {CounterComponent} from './CounterComponent';
import {HeadComponent} from './HeadComponent';
import {useHelloQuery} from 'src/apollo';
import {Me} from 'src/classes/Me';
import {LinkComponent} from 'src/components/LinkComponent';
import {
  homeBreadcrumb,
  homeTitle,
  mePath,
  meTitle,
  signInPath,
  signInTitle,
} from 'src/utils/pageHelpers';

export const HomeComponent: NextPage = () => {
  const {data} = useHelloQuery();
  const me = useListen(Me.useMe(), me => me);

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

      <div>
        {me.data != null ? (
          <LinkComponent href={mePath}>{meTitle}</LinkComponent>
        ) : (
          <LinkComponent href={signInPath}>{signInTitle}</LinkComponent>
        )}
      </div>

      <div>
        <LinkComponent href="#">
          <a css={{color: 'red'}}>{data?.hello}</a>
        </LinkComponent>
      </div>

      <CounterComponent css={{marginTop: '1em'}} />
    </div>
  );
};
