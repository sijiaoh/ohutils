import type {NextPage} from 'next';
import {BreadcrumbListComponent} from './BreadcrumbListComponent';
import {HeadComponent} from './HeadComponent';
import {postsPath, postsTitle} from './posts/PostsComponent';
import {homeBreadcrumb, homeTitle} from 'src/pages';
import {Link} from 'src/utils/Link';

export const HomeComponent: NextPage = () => {
  return (
    <div>
      <HeadComponent subTitle={homeTitle} />

      <BreadcrumbListComponent list={[homeBreadcrumb]} />

      <h1>Welcome to ohutils.com!</h1>

      <div>
        <Link href={postsPath}>{postsTitle}</Link>
      </div>
    </div>
  );
};
