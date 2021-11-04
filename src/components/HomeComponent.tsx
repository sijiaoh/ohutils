import type {NextPage} from 'next';
import Container from 'react-bootstrap/Container';
import {BreadcrumbListComponent} from './BreadcrumbListComponent';
import {HeadComponent} from './HeadComponent';
import {homeBreadcrumb, homeTitle} from 'src/pages';
import {postsPath, postsTitle} from 'src/pages/posts';
import {Link} from 'src/utils/Link';

export const HomeComponent: NextPage = () => {
  return (
    <Container>
      <HeadComponent subTitle={homeTitle} />

      <BreadcrumbListComponent list={[homeBreadcrumb]} />

      <h1>Welcome to ohutils.com!</h1>

      <div>
        <Link href={postsPath}>{postsTitle}</Link>
      </div>
    </Container>
  );
};
