import type {NextPage} from 'next';
import {useRef} from 'react';
import {BreadcrumbComponent} from '../BreadcrumbComponent';
import {HeadComponent} from '../HeadComponent';
import {PostEditorComponent} from './PostEditorComponent';
import {Post} from 'src/classes/Post';
import {withAuth} from 'src/hocs/withAuth';

export const PostsCreateComponent: NextPage = withAuth(() => {
  const post = useRef(new Post()).current;

  return (
    <div>
      <HeadComponent subTitle="投稿作成" />

      <BreadcrumbComponent
        list={[
          {title: 'Home', path: '/'},
          {title: '投稿一覧', path: '/posts'},
          {title: '投稿作成'},
        ]}
      />

      <h1>投稿作成</h1>

      <PostEditorComponent post={post} />
    </div>
  );
});
