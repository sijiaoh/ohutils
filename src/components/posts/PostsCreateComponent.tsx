import type {NextPage} from 'next';
import {useRef} from 'react';
import {BreadcrumbListComponent} from '../BreadcrumbListComponent';
import {HeadComponent} from '../HeadComponent';
import {PostEditorComponent} from './PostEditorComponent';
import {Post} from 'src/classes/Post';
import {homeBreadcrumb} from 'src/pages';
import {postsBreadcrumb} from 'src/pages/posts';
import {postsCreateTitle} from 'src/pages/posts/create';

export const PostsCreateComponent: NextPage = () => {
  const post = useRef(new Post()).current;

  return (
    <div>
      <HeadComponent subTitle={postsCreateTitle} />

      <BreadcrumbListComponent
        list={[homeBreadcrumb, postsBreadcrumb, {title: postsCreateTitle}]}
      />

      <h1>{postsCreateTitle}</h1>

      <PostEditorComponent post={post} />
    </div>
  );
};
