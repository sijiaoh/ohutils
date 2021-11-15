import {useListen} from '@reactive-class/react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import {BreadcrumbListComponent} from '../BreadcrumbListComponent';
import {HeadComponent} from '../HeadComponent';
import {LoadingComponent} from '../LoadingComponent';
import {Order, useGetPostsQuery} from 'src/apollo';
import {Me} from 'src/classes/Me';
import {LinkComponent} from 'src/components/LinkComponent';
import {gql} from 'src/utils/gql';
import {
  homeBreadcrumb,
  postPath,
  postTitle,
  postsTitle,
  postsCreatePath,
  postsCreateTitle,
} from 'src/utils/pageHelpers';
import {printDateTime} from 'src/utils/printDateTime';

gql`
  query getPosts($order: PostsOrderInputType!) {
    posts(order: $order) {
      id
      title
      createdAt
      updatedAt
    }
  }
`;

export const PostsComponent = () => {
  const {data, loading} = useGetPostsQuery({
    variables: {order: {createdAt: Order.Desc}},
  });
  const meData = useListen(Me.useMe(), ({data}) => data);

  if (loading) return <LoadingComponent />;
  return (
    <Container>
      <HeadComponent subTitle={postsTitle} />

      <BreadcrumbListComponent list={[homeBreadcrumb, {title: postsTitle}]} />

      <h1>{postsTitle}</h1>

      {meData && (
        <div>
          <LinkComponent href={postsCreatePath}>
            {postsCreateTitle}
          </LinkComponent>
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
          {data?.posts.map(post => (
            <tr key={post.id}>
              <td>
                <LinkComponent href={postPath(post.id)}>
                  {postTitle(post.title)}
                </LinkComponent>
              </td>
              <td>{printDateTime(post.createdAt)}</td>
              <td>{printDateTime(post.updatedAt)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
