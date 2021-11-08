import type {NextPage} from 'next';
import Container from 'react-bootstrap/Container';
import {BreadcrumbListComponent} from './BreadcrumbListComponent';
import {HeadComponent} from './HeadComponent';
import {postsPath, postsTitle} from 'src/pages/posts';
import {votesPath, votesTitle} from 'src/pages/votes';
import {Link} from 'src/utils/Link';
import {homeBreadcrumb, homeTitle} from 'src/utils/pageHelpers';

export const HomeComponent: NextPage = () => {
  return (
    <Container>
      <HeadComponent subTitle={homeTitle} />

      <BreadcrumbListComponent list={[homeBreadcrumb]} />

      <h1>Welcome to ohutils.com!</h1>

      <div>
        <Link href={postsPath}>{postsTitle}</Link>
      </div>
      <div>
        <Link href={votesPath}>{votesTitle}</Link>
      </div>
    </Container>
  );
};
