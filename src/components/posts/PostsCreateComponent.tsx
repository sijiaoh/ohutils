import type {NextPage} from 'next';
import {useRef} from 'react';
import {BreadcrumbComponent} from '../BreadcrumbComponent';
import {HeadComponent} from '../HeadComponent';
import {homePath, homeTitle} from '../HomeComponent';
import {PostEditorComponent} from './PostEditorComponent';
import {postsPath, postsTitle} from './PostsComponent';
import {Post} from 'src/classes/Post';
import {withAuth} from 'src/hocs/withAuth';

export const postsCreateTitle = '投稿作成';
export const postsCreatePath = '/posts/create';

export const PostsCreateComponent: NextPage = withAuth(() => {
  const post = useRef(new Post()).current;

  return (
    <div>
      <HeadComponent subTitle={postsCreateTitle} />

      <BreadcrumbComponent
        list={[
          {title: homeTitle, path: homePath},
          {title: postsTitle, path: postsPath},
          {title: postsCreateTitle},
        ]}
      />

      <h1>{postsCreateTitle}</h1>

      <PostEditorComponent post={post} />
    </div>
  );
});
