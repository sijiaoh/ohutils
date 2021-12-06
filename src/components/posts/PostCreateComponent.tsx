import type {NextPage} from 'next';
import {useRef} from 'react';
import Container from 'react-bootstrap/Container';
import {BreadcrumbListComponent} from '../BreadcrumbListComponent';
import {HeadComponent} from '../HeadComponent';
import {PostEditorComponent} from './PostEditorComponent';
import {Post} from 'src/classes/Post';
import {
  homeBreadcrumb,
  postsBreadcrumb,
  postsCreateTitle,
} from 'src/utils/pageHelpers';

export const PostCreateComponent: NextPage = () => {
  const post = useRef(new Post()).current;

  return (
    <Container>
      <HeadComponent subTitle={postsCreateTitle} />

      <BreadcrumbListComponent
        list={[homeBreadcrumb, postsBreadcrumb, {title: postsCreateTitle}]}
      />

      <h1>{postsCreateTitle}</h1>

      <PostEditorComponent post={post} />
    </Container>
  );
};
