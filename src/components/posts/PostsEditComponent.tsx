import {useListen} from '@reactive-class/react';
import type {NextPage} from 'next';
import {useRouter} from 'next/dist/client/router';
import {useEffect, useRef} from 'react';
import {BreadcrumbComponent} from '../BreadcrumbComponent';
import {HeadComponent} from '../HeadComponent';
import {PostEditorComponent} from './PostEditorComponent';
import {Post} from 'src/classes/Post';
import {withAuth} from 'src/hocs/withAuth';

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
      <HeadComponent subTitle="投稿編集" />

      <BreadcrumbComponent
        list={[
          {title: 'Home', path: '/'},
          {title: '投稿一覧', path: '/posts'},
          {title: originalTitleRef.current || '', path: `/post/${id}`},
          {title: '投稿編集'},
        ]}
      />

      <h1>投稿編集</h1>

      <PostEditorComponent post={post} />
    </div>
  );
});
