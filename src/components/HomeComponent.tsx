import type {NextPage} from 'next';
import {BreadcrumbComponent} from './BreadcrumbComponent';
import {HeadComponent} from './HeadComponent';
import {postsPath, postsTitle} from './posts/PostsComponent';
import {Link} from 'src/utils/Link';

export const homeTitle = 'Home';
export const homePath = '/';

export const HomeComponent: NextPage = () => {
  return (
    <div>
      <HeadComponent subTitle={homeTitle} />

      <BreadcrumbComponent list={[{title: homeTitle, path: homePath}]} />

      <h1>Welcome to ohutils.com!</h1>

      <div>
        <Link href={postsPath}>{postsTitle}</Link>
      </div>
    </div>
  );
};
