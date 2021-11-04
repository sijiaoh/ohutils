import {useListen} from '@reactive-class/react';
import type {NextPage} from 'next';
import {BreadcrumbListComponent} from './BreadcrumbListComponent';
import {HeadComponent} from './HeadComponent';
import {Me} from 'src/classes/Me';
import {homeBreadcrumb} from 'src/pages';
import {meTitle} from 'src/pages/me';

export const MeComponent: NextPage = () => {
  const me = Me.useMe();
  const meData = useListen(me);

  return (
    <div>
      <HeadComponent subTitle={meTitle} />

      <BreadcrumbListComponent list={[homeBreadcrumb, {title: meTitle}]} />

      {JSON.stringify(meData.data)}
    </div>
  );
};
