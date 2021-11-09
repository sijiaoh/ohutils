import {useListen} from '@reactive-class/react';
import {useRouter} from 'next/dist/client/router';
import {pick} from 'underscore';
import {MarkdownEditorComponent} from '../form/MarkdownEditorComponent';
import type {Post} from 'src/classes/Post';
import {
  FormComponent,
  FieldComponent,
  SubmitButtonComponent,
} from 'src/components/form';
import type {DefaultProps} from 'src/utils/DefaultProps';

export const PostEditorComponent = ({
  post,
  className,
}: DefaultProps<{post: Post}>) => {
  const router = useRouter();
  const postData = useListen(post);

  return (
    <FormComponent
      className={className}
      defaultValues={{
        ...pick(postData.input, 'title', 'text'),
        tags: postData.input.tags.join(' '),
      }}
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
        css={{height: '30em'}}
      />

      <FieldComponent id="tags" name="tags" label="タグ" />
      <SubmitButtonComponent css={{marginTop: '2em'}}>
        登録
      </SubmitButtonComponent>
    </FormComponent>
  );
};
