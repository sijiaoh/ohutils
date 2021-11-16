import {useListen} from '@reactive-class/react';
import {useRouter} from 'next/dist/client/router';
import {pick} from 'underscore';
import {
  CheckboxComponent,
  FormComponent,
  FieldComponent,
  SubmitButtonComponent,
  MarkdownEditorComponent,
} from '../form';
import type {Post} from 'src/classes/Post';
import type {DefaultProps} from 'src/utils/DefaultProps';
import {postPath} from 'src/utils/pageHelpers';

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
        ...pick(postData.input, 'title', 'text', 'copyProtect'),
        tags: postData.input.tags.join(' '),
      }}
      onSubmit={async ({title, text, copyProtect, tags}) => {
        post.setInput({title, text, copyProtect});
        post.setTagsFromStr(tags);
        await post.save();
        if (!post.id) throw new Error('Failed to create post.');
        await router.push(postPath(post.id));
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

      <CheckboxComponent
        id="copyProtect"
        name="copyProtect"
        label="コピープロテクト"
      />

      <SubmitButtonComponent css={{marginTop: '2em'}}>
        登録
      </SubmitButtonComponent>
    </FormComponent>
  );
};
