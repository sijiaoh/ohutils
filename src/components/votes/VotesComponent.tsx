import {useListen} from '@reactive-class/react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import {BreadcrumbListComponent} from '../BreadcrumbListComponent';
import {HeadComponent} from '../HeadComponent';
import {Order, useVotesQuery} from 'src/apollo';
import {Me} from 'src/classes/Me';
import {homeBreadcrumb} from 'src/pages';
import {votesTitle} from 'src/pages/votes';
import {votesCreatePath, votesCreateTitle} from 'src/pages/votes/create';
import {Link} from 'src/utils/Link';
import {printDateTime} from 'src/utils/printDateTime';

export const VotesComponent = () => {
  const {data, loading} = useVotesQuery({
    variables: {order: {createdAt: Order.Desc}},
  });
  const meData = useListen(Me.useMe(), ({data}) => data);

  if (loading) return <div>Loading...</div>;
  return (
    <Container>
      <HeadComponent subTitle={votesTitle} />

      <BreadcrumbListComponent list={[homeBreadcrumb, {title: votesTitle}]} />

      <h1>{votesTitle}</h1>

      {meData && (
        <div>
          <Link href={votesCreatePath}>{votesCreateTitle}</Link>
        </div>
      )}

      <Table>
        <thead>
          <tr>
            <th>投稿名</th>
            <th>投稿日</th>
            <th>更新日</th>
          </tr>
        </thead>
        <tbody>
          {data?.votes.map(vote => (
            <tr key={vote.id}>
              <td>
                {/* <Link href={votePath(vote.id)}>{voteTitle(vote.title)}</Link> */}
                TODO
              </td>
              <td>{printDateTime(vote.createdAt)}</td>
              <td>{printDateTime(vote.updatedAt)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
