import {useListen} from '@reactive-class/react';
import {MarkdownComponent} from '../MarkdownComponent';
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
  const postData = useListen(post);

  const initialValues = {
    title: postData.title,
    text: postData.text,
    tags: postData.tags.join(' '),
  };

  return (
    <FormComponent
      className={className}
      initialValues={initialValues}
      validate={({title}) => {
        const errors: {[key in keyof typeof initialValues]?: string} = {};
        if (!title) errors.title = 'タイトルは必須です';
        return errors;
      }}
      onChange={({title, text, tags}) => {
        post.title = title;
        post.text = text;
        post.setTagsFromStr(tags);
      }}
      onSubmit={async ({title, text, tags}) => {
        post.title = title;
        post.text = text;
        post.setTagsFromStr(tags);
        await post.save();
      }}
    >
      <FieldComponent id="title" name="title" label="タイトル" />

      <div css={{display: 'flex', height: '30em'}}>
        <FieldComponent
          id="text"
          name="text"
          label="内容"
          as="textarea"
          css={{width: '50%'}}
          fieldCss={{flex: 1}}
        />
        <MarkdownComponent
          text={postData.text}
          css={{
            width: '50%',
            height: '100%',
            overflow: 'auto',
            border: 'solid 1px lightgray',
          }}
        />
      </div>

      <FieldComponent id="tags" name="tags" label="タグ" />
      <SubmitButtonComponent>登録</SubmitButtonComponent>
    </FormComponent>
  );
};
