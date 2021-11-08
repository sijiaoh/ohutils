import {useListen} from '@reactive-class/react';
import type {NextPage} from 'next';
import {useRouter} from 'next/dist/client/router';
import {useEffect, useRef} from 'react';
import Container from 'react-bootstrap/Container';
import {BreadcrumbListComponent} from '../BreadcrumbListComponent';
import {HeadComponent} from '../HeadComponent';
import {PostEditorComponent} from './PostEditorComponent';
import {Post} from 'src/classes/Post';
import {
  homeBreadcrumb,
  postBreadcrumb,
  postsBreadcrumb,
  postsEditTitle,
} from 'src/utils/pageHelpers';

export const PostsEditComponent: NextPage = () => {
  const router = useRouter();
  const {id} = router.query;
  if (typeof id !== 'string') throw new Error('id is not providing.');
  const postData = useListen(useRef(new Post(id)).current);

  useEffect(() => {
    void postData.load();
  }, [postData]);

  if (!postData.loaded) return <div>Loading...</div>;
  return (
    <Container>
      <HeadComponent subTitle={postsEditTitle} />

      <BreadcrumbListComponent
        list={[
          homeBreadcrumb,
          postsBreadcrumb,
          postBreadcrumb({id, title: postData.data?.title || ''}),
          {title: postsEditTitle},
        ]}
      />

      <h1>{postsEditTitle}</h1>

      <PostEditorComponent post={postData} />
    </Container>
  );
};
