import type {NextPage} from 'next';
import {BreadcrumbComponent} from './BreadcrumbComponent';
import {HeadComponent} from './HeadComponent';
import {Link} from 'src/utils/Link';

export const HomeComponent: NextPage = () => {
  return (
    <div>
      <HeadComponent subTitle={'Home'} />

      <BreadcrumbComponent
        list={[
          {title: 'Home', path: '/'},
          {title: 'Home', path: '/'},
        ]}
      />

      <h1>Welcome to ohutils.com!</h1>

      <div>
        <Link href="/posts">投稿一覧</Link>
      </div>
    </div>
  );
};
