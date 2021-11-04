import {useListen} from '@reactive-class/react';
import type {NextPage} from 'next';
import {useRouter} from 'next/dist/client/router';
import {useEffect, useRef} from 'react';
import {BreadcrumbListComponent} from '../BreadcrumbListComponent';
import {HeadComponent} from '../HeadComponent';
import {PostEditorComponent} from './PostEditorComponent';
import {Post} from 'src/classes/Post';
import {homeBreadcrumb} from 'src/pages';
import {postBreadcrumb} from 'src/pages/post/[id]';
import {postsBreadcrumb} from 'src/pages/posts';
import {postsEditTitle} from 'src/pages/posts/edit/[id]';

export const PostsEditComponent: NextPage = () => {
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

      <BreadcrumbListComponent
        list={[
          homeBreadcrumb,
          postsBreadcrumb,
          postBreadcrumb({id, title: originalTitleRef.current || ''}),
          {title: postsEditTitle},
        ]}
      />

      <h1>{postsEditTitle}</h1>

      <PostEditorComponent post={post} />
    </div>
  );
};
