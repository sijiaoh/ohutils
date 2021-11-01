import {useListen} from '@reactive-class/react';
import {useRouter} from 'next/dist/client/router';
import {useEffect, useRef} from 'react';
import {ContainerComponent} from '../ContainerComponent';
import {MarkdownComponent} from '../MarkdownComponent';
import {Post} from 'src/classes/Post';

export const PostComponent = () => {
  const router = useRouter();
  const {id} = router.query;
  if (typeof id !== 'string') throw new Error('id is not providing.');
  const post = useRef(new Post(id)).current;
  const postData = useListen(post, ({data}) => data);

  useEffect(() => {
    void post.load();
  }, [post]);

  if (!postData) return <div>Loading...</div>;
  return (
    <ContainerComponent>
      <h1>{postData.title}</h1>

      <ul>
        {postData.tags.map(tag => (
          <div key={tag}>{tag}</div>
        ))}
      </ul>

      <MarkdownComponent text={postData.text}></MarkdownComponent>
    </ContainerComponent>
  );
};
