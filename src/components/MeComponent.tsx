import {useListen} from '@reactive-class/react';
import type {NextPage} from 'next';
import {BreadcrumbComponent} from './BreadcrumbComponent';
import {HeadComponent} from './HeadComponent';
import {homePath, homeTitle} from './HomeComponent';
import {Me} from 'src/classes/Me';
import {withAuth} from 'src/hocs/withAuth';

export const meTitle = 'Me';
export const mePath = '/me';

export const MeComponent: NextPage = withAuth(() => {
  const me = Me.useMe();
  const meData = useListen(me);

  return (
    <div>
      <HeadComponent subTitle={meTitle} />

      <BreadcrumbComponent
        list={[{title: homeTitle, path: homePath}, {title: meTitle}]}
      />

      {JSON.stringify(meData.data)}
    </div>
  );
});
