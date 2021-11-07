import type {NextPage} from 'next';
import Container from 'react-bootstrap/Container';
import {BreadcrumbListComponent} from '../BreadcrumbListComponent';
import {HeadComponent} from '../HeadComponent';
import {homeBreadcrumb} from 'src/pages';
import {votesCreateTitle} from 'src/pages/votes/create';

export const VotesCreateComponent: NextPage = () => {
  return (
    <Container>
      <HeadComponent subTitle={votesCreateTitle} />

      <BreadcrumbListComponent
        list={[homeBreadcrumb, {title: votesCreateTitle}]}
      />

      <h1>{votesCreateTitle}</h1>
    </Container>
  );
};
