import type {NextPage} from 'next';
import Container from 'react-bootstrap/Container';
import {BreadcrumbListComponent} from './BreadcrumbListComponent';
import {HeadComponent} from './HeadComponent';
import {LinkComponent} from 'src/components/LinkComponent';
import {
  postsPath,
  postsTitle,
  votesPath,
  votesTitle,
  homeBreadcrumb,
  homeTitle,
} from 'src/utils/pageHelpers';

export const HomeComponent: NextPage = () => {
  return (
    <Container>
      <HeadComponent subTitle={homeTitle} />

      <BreadcrumbListComponent list={[homeBreadcrumb]} />

      <h1>Welcome to ohutils.com!</h1>

      <div>
        <LinkComponent href={postsPath}>{postsTitle}</LinkComponent>
      </div>
      <div>
        <LinkComponent href={votesPath}>{votesTitle}</LinkComponent>
      </div>
    </Container>
  );
};
