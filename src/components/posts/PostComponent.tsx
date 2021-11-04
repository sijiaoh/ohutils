import {useListen} from '@reactive-class/react';
import {useRouter} from 'next/dist/client/router';
import {useEffect, useRef} from 'react';
import Container from 'react-bootstrap/Container';
import {BreadcrumbListComponent} from '../BreadcrumbListComponent';
import {HeadComponent} from '../HeadComponent';
import {MarkdownComponent} from '../MarkdownComponent';
import {Me} from 'src/classes/Me';
import {Post} from 'src/classes/Post';
import {homeBreadcrumb} from 'src/pages';
import {postTitle} from 'src/pages/post/[id]';
import {postsBreadcrumb} from 'src/pages/posts';
import {postsEditPath, postsEditTitle} from 'src/pages/posts/edit/[id]';
import {Link} from 'src/utils/Link';

export const PostComponent = () => {
  const router = useRouter();
  const {id} = router.query;
  if (typeof id !== 'string') throw new Error('id is not providing.');
  const post = useRef(new Post(id)).current;
  const postData = useListen(post, ({data}) => data);
  const meData = useListen(Me.useMe(), ({data}) => data);

  useEffect(() => {
    void post.load();
  }, [post]);

  if (!postData) return <div>Loading...</div>;
  return (
    <Container>
      <HeadComponent subTitle={postTitle(postData.title)} />

      <BreadcrumbListComponent
        list={[
          homeBreadcrumb,
          postsBreadcrumb,
          {title: postTitle(postData.title)},
        ]}
      />

      <h1>{postTitle(postData.title)}</h1>

      {meData && (
        <div>
          <Link href={postsEditPath(id)}>{postsEditTitle}</Link>
        </div>
      )}

      <ul>
        {postData.tags.map(tag => (
          <div key={tag}>{tag}</div>
        ))}
      </ul>

      <MarkdownComponent text={postData.text}></MarkdownComponent>
    </Container>
  );
};
