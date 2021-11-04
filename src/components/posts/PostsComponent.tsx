import {useListen} from '@reactive-class/react';
import {BreadcrumbListComponent} from '../BreadcrumbListComponent';
import {ContainerComponent} from '../ContainerComponent';
import {HeadComponent} from '../HeadComponent';
import {Order, usePostsQuery} from 'src/apollo';
import {Me} from 'src/classes/Me';
import {homeBreadcrumb} from 'src/pages';
import {postPath, postTitle} from 'src/pages/post/[id]';
import {postsTitle} from 'src/pages/posts';
import {postsCreatePath, postsCreateTitle} from 'src/pages/posts/create';
import {Link} from 'src/utils/Link';

export const PostsComponent = () => {
  const {data, loading} = usePostsQuery({
    variables: {order: {createdAt: Order.Asc}},
  });
  const meData = useListen(Me.useMe(), ({data}) => data);

  if (loading) return <div>Loading...</div>;
  return (
    <ContainerComponent>
      <HeadComponent subTitle={postsTitle} />

      <BreadcrumbListComponent list={[homeBreadcrumb, {title: postsTitle}]} />

      <h1>{postsTitle}</h1>

      {meData && (
        <div>
          <Link href={postsCreatePath}>{postsCreateTitle}</Link>
        </div>
      )}

      <ul>
        {data?.posts.map(post => (
          <li key={post.id}>
            <Link href={postPath(post.id)}>{postTitle(post.title)}</Link>
          </li>
        ))}
      </ul>
    </ContainerComponent>
  );
};
