import {usePostsQuery} from 'src/apollo';
import {Link} from 'src/utils/Link';

export const PostsComponent = () => {
  const {data, loading} = usePostsQuery();

  if (loading) return <div>Loading...</div>;
  return (
    <div>
      {data?.posts.map(post => (
        <Link key={post.id} href={`/post/${post.id}`}>
          {post.title}
        </Link>
      ))}
    </div>
  );
};
