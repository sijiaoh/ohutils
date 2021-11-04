import {useListen} from '@reactive-class/react';
import type {NextPage} from 'next';
import {useRouter} from 'next/dist/client/router';
import {useEffect, useRef} from 'react';
import {BreadcrumbComponent} from '../BreadcrumbComponent';
import {HeadComponent} from '../HeadComponent';
import {homePath, homeTitle} from '../HomeComponent';
import {postPath, postTitle} from './PostComponent';
import {PostEditorComponent} from './PostEditorComponent';
import {postsPath, postsTitle} from './PostsComponent';
import {Post} from 'src/classes/Post';
import {withAuth} from 'src/hocs/withAuth';

export const postsEditTitle = '投稿編集';
export const postsEditPath = (id: string) => `/posts/edit/${id}`;

export const PostsEditComponent: NextPage = withAuth(() => {
  const router = useRouter();
  const {id} = router.query;
  if (typeof id !== 'string') throw new Error('id is not providing.');
  const post = useRef(new Post(id)).current;
  const postData = useListen(post, ({data}) => data);
  const originalTitleRef = useRef<string | undefined>();

  useEffect(() => {
    void post.load();
  }, [post]);

  useEffect(() => {
    if (!postData) return;
    if (originalTitleRef.current != null) return;

    originalTitleRef.current = postData.title;
  }, [postData]);

  if (!postData) return <div>Loading...</div>;
  return (
    <div>
      <HeadComponent subTitle={postsEditTitle} />

      <BreadcrumbComponent
        list={[
          {title: homeTitle, path: homePath},
          {title: postsTitle, path: postsPath},
          {
            title: postTitle(originalTitleRef.current || ''),
            path: postPath(id),
          },
          {title: postsEditTitle},
        ]}
      />

      <h1>{postsEditTitle}</h1>

      <PostEditorComponent post={post} />
    </div>
  );
});
