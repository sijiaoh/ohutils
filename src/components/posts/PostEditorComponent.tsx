import {useListen} from '@reactive-class/react';
import {useRouter} from 'next/dist/client/router';
import {useRef} from 'react';
import {debounce} from 'underscore';
import {MarkdownEditorComponent} from '../form/MarkdownEditorComponent';
import {Post} from 'src/classes/Post';
import {
  FormComponent,
  FieldComponent,
  SubmitButtonComponent,
} from 'src/components/form';
import {DefaultProps} from 'src/utils/DefaultProps';

export const PostEditorComponent = ({
  post,
  className,
}: DefaultProps<{post: Post}>) => {
  const router = useRouter();
  const postData = useListen(post);
  const onChange = useRef(
    debounce(({title, text, tags}: typeof initialValues) => {
      post.setInput({title, text});
      post.setTagsFromStr(tags);
    }, 500)
  ).current;

  const initialValues = {
    title: postData.data?.title || '',
    text: postData.data?.text || '',
    tags: postData.data?.tags.join(' ') || '',
  };

  return (
    <FormComponent
      className={className}
      initialValues={initialValues}
      validate={({title}) => {
        const errors: {[key in keyof typeof initialValues]?: string} = {};
        if (!title) errors.title = 'タイトルは必須です。';
        return errors;
      }}
      onChange={onChange}
      onSubmit={async ({title, text, tags}) => {
        post.setInput({title, text});
        post.setTagsFromStr(tags);
        await post.save();
        await router.push(`/post/${post.id}`);
      }}
    >
      <FieldComponent id="title" name="title" label="タイトル" />

      <MarkdownEditorComponent
        id="text"
        name="text"
        label="本文"
        text={postData.input.text}
        css={{height: '30em'}}
      />

      <FieldComponent id="tags" name="tags" label="タグ" />
      <SubmitButtonComponent css={{marginTop: '2em'}}>
        登録
      </SubmitButtonComponent>
    </FormComponent>
  );
};
