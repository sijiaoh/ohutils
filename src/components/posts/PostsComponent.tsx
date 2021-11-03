import {useListen} from '@reactive-class/react';
import {ContainerComponent} from '../ContainerComponent';
import {HeadComponent} from '../HeadComponent';
import {Order, usePostsQuery} from 'src/apollo';
import {Me} from 'src/classes/Me';
import {Link} from 'src/utils/Link';

export const PostsComponent = () => {
  const {data, loading} = usePostsQuery({
    variables: {order: {createdAt: Order.Asc}},
  });
  const meData = useListen(Me.useMe(), ({data}) => data);

  if (loading) return <div>Loading...</div>;
  return (
    <ContainerComponent>
      <HeadComponent subTitle="投稿一覧" />

      {meData && (
        <div>
          <Link href="posts/create">新規投稿</Link>
        </div>
      )}

      <ul>
        {data?.posts.map(post => (
          <li key={post.id}>
            <Link href={`/post/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </ContainerComponent>
  );
};
