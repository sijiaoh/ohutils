import {useListen} from '@reactive-class/react';
import {useRouter} from 'next/dist/client/router';
import {useEffect, useRef} from 'react';
import Container from 'react-bootstrap/Container';
import {BreadcrumbListComponent} from '../BreadcrumbListComponent';
import {HeadComponent} from '../HeadComponent';
import {MarkdownComponent} from '../MarkdownComponent';
import {RemovePostButtonComponent} from './RemovePostButtonComponent';
import {Me} from 'src/classes/Me';
import {Post} from 'src/classes/Post';
import {Link} from 'src/utils/Link';
import {
  homeBreadcrumb,
  postTitle,
  postsBreadcrumb,
  postsEditPath,
  postsEditTitle,
} from 'src/utils/pageHelpers';

export const PostComponent = () => {
  const router = useRouter();
  const {id} = router.query;
  const post = useRef(new Post()).current;
  const postData = useListen(post, ({data}) => data);
  const meData = useListen(Me.useMe(), ({data}) => data);

  useEffect(() => {
    if (typeof id !== 'string') return;
    post.id = id;
    void post.load();
  }, [id, post]);

  if (!postData || typeof id !== 'string') return <div>Loading...</div>;
  return (
    <Container css={{userSelect: 'none'}}>
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
        <div css={{display: 'flex'}}>
          <div>
            <Link href={postsEditPath(id)}>{postsEditTitle}</Link>
          </div>
          <div css={{marginLeft: '0.5em'}}>
            <RemovePostButtonComponent post={post} />
          </div>
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
