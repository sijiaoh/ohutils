import type {NextPage} from 'next';
import {useRef} from 'react';
import {HeadComponent} from '../HeadComponent';
import {PostEditorComponent} from './PostEditorComponent';
import {Post} from 'src/classes/Post';

export const PostsCreateComponent: NextPage = () => {
  const post = useRef(new Post()).current;

  return (
    <div>
      <HeadComponent subTitle="投稿作成" />

      <h1>投稿作成</h1>

      <PostEditorComponent post={post} />
    </div>
  );
};
