import {useListen} from '@reactive-class/react';
import {useRouter} from 'next/dist/client/router';
import {useEffect, useRef} from 'react';
import {BreadcrumbComponent} from '../BreadcrumbComponent';
import {ContainerComponent} from '../ContainerComponent';
import {HeadComponent} from '../HeadComponent';
import {homePath, homeTitle} from '../HomeComponent';
import {MarkdownComponent} from '../MarkdownComponent';
import {postsPath, postsTitle} from './PostsComponent';
import {postsEditPath, postsEditTitle} from './PostsEditComponent';
import {Me} from 'src/classes/Me';
import {Post} from 'src/classes/Post';
import {Link} from 'src/utils/Link';

export const postTitle = (title: string) => title;
export const postPath = (id: string) => `/post/${id}`;

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
    <ContainerComponent>
      <HeadComponent subTitle={postTitle(postData.title)} />

      <BreadcrumbComponent
        list={[
          {title: homeTitle, path: homePath},
          {title: postsTitle, path: postsPath},
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
    </ContainerComponent>
  );
};
