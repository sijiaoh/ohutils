import {ContainerComponent} from '../ContainerComponent';
import {usePostsQuery} from 'src/apollo';
import {Link} from 'src/utils/Link';

export const PostsComponent = () => {
  const {data, loading} = usePostsQuery();

  if (loading) return <div>Loading...</div>;
  return (
    <ContainerComponent>
      <div>
        <Link href="posts/create">新規投稿</Link>
      </div>

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
