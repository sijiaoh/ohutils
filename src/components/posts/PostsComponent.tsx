import {usePostsQuery} from 'src/apollo';
import {Link} from 'src/utils/Link';

export const PostsComponent = () => {
  const {data, loading} = usePostsQuery();

  if (loading) return <div>Loading...</div>;
  return (
    <div>
      <ul>
        {data?.posts.map(post => (
          <li key={post.id}>
            <Link href={`/post/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
