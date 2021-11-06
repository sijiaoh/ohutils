import {useListen} from '@reactive-class/react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import {BreadcrumbListComponent} from '../BreadcrumbListComponent';
import {HeadComponent} from '../HeadComponent';
import {Order, usePostsQuery} from 'src/apollo';
import {Me} from 'src/classes/Me';
import {homeBreadcrumb} from 'src/pages';
import {postPath, postTitle} from 'src/pages/post/[id]';
import {postsTitle} from 'src/pages/posts';
import {postsCreatePath, postsCreateTitle} from 'src/pages/posts/create';
import {Link} from 'src/utils/Link';
import {printDateTime} from 'src/utils/printDateTime';

export const PostsComponent = () => {
  const {data, loading} = usePostsQuery({
    variables: {order: {createdAt: Order.Desc}},
  });
  const meData = useListen(Me.useMe(), ({data}) => data);

  if (loading) return <div>Loading...</div>;
  return (
    <Container>
      <HeadComponent subTitle={postsTitle} />

      <BreadcrumbListComponent list={[homeBreadcrumb, {title: postsTitle}]} />

      <h1>{postsTitle}</h1>

      {meData && (
        <div>
          <Link href={postsCreatePath}>{postsCreateTitle}</Link>
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
                <Link href={postPath(post.id)}>{postTitle(post.title)}</Link>
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
