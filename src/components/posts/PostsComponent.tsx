import {useListen} from '@reactive-class/react';
import {BreadcrumbComponent} from '../BreadcrumbComponent';
import {ContainerComponent} from '../ContainerComponent';
import {HeadComponent} from '../HeadComponent';
import {homePath, homeTitle} from '../HomeComponent';
import {postPath, postTitle} from './PostComponent';
import {postsCreatePath, postsCreateTitle} from './PostsCreateComponent';
import {Order, usePostsQuery} from 'src/apollo';
import {Me} from 'src/classes/Me';
import {Link} from 'src/utils/Link';

export const postsTitle = '投稿一覧';
export const postsPath = '/posts';

export const PostsComponent = () => {
  const {data, loading} = usePostsQuery({
    variables: {order: {createdAt: Order.Asc}},
  });
  const meData = useListen(Me.useMe(), ({data}) => data);

  if (loading) return <div>Loading...</div>;
  return (
    <ContainerComponent>
      <HeadComponent subTitle={postsTitle} />

      <BreadcrumbComponent
        list={[{title: homeTitle, path: homePath}, {title: postsTitle}]}
      />

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
