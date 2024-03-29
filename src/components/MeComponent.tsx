import {useListen} from '@reactive-class/react';
import type {NextPage} from 'next';
import {BreadcrumbListComponent} from './BreadcrumbListComponent';
import {HeadComponent} from './HeadComponent';
import {LoadingComponent} from './LoadingComponent';
import {OauthLinksComponent, OauthLinksDetails} from './OauthLinksComponent';
import {Me} from 'src/classes/Me';
import {homeBreadcrumb, meTitle} from 'src/utils/pageHelpers';

export const MeComponent: NextPage = () => {
  const meData = useListen(Me.useMe());

  if (meData.data == null) return <LoadingComponent css={{padding: '1em 0'}} />;

  const details: OauthLinksDetails = meData.data?.linkedProviders.map(
    provider => ({
      provider,
      postfix: 'リンク済み',
      disabled: true,
    })
  );

  return (
    <div>
      <HeadComponent subTitle={meTitle} />

      <BreadcrumbListComponent list={[homeBreadcrumb, {title: meTitle}]} />

      <OauthLinksComponent details={details} />
    </div>
  );
};
