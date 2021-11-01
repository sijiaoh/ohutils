import {useListen} from '@reactive-class/react';
import type {NextPage} from 'next';
import {HeadComponent} from './HeadComponent';
import {Me} from 'src/classes/Me';
import {withAuth} from 'src/hocs/withAuth';

export const MeComponent: NextPage = withAuth(() => {
  const me = Me.useMe();
  const meData = useListen(me);

  return (
    <div>
      <HeadComponent subTitle={'Me'} />

      {JSON.stringify(meData.data)}
    </div>
  );
});
