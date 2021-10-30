import type {NextPage} from 'next';
import {HeadComponent} from '../HeadComponent';
import {apolloSdk} from 'src/apollo';
import {
  FormComponent,
  FieldComponent,
  SubmitButtonComponent,
} from 'src/components/form';

export const PostsCreateComponent: NextPage = () => {
  const initialValues = {title: '', text: '', tags: ''};

  return (
    <div>
      <HeadComponent subTitle="投稿作成" />

      <h1>投稿作成</h1>

      <FormComponent
        initialValues={initialValues}
        validate={({title}) => {
          const errors: {[key in keyof typeof initialValues]?: string} = {};
          if (!title) errors.title = 'タイトルは必須です';
          return errors;
        }}
        onSubmit={async ({title, text, tags}) => {
          await apolloSdk.createPostMutation({
            variables: {
              post: {
                text,
                title,
                tags: tags
                  .replace(/\s+/g, ' ')
                  .split(' ')
                  .filter(tag => !!tag),
              },
            },
          });
        }}
      >
        <FieldComponent id="title" name="title" label="タイトル" />
        <FieldComponent id="text" name="text" label="内容" as="textarea" />
        <FieldComponent id="tags" name="tags" label="タグ" />
        <SubmitButtonComponent>登録</SubmitButtonComponent>
      </FormComponent>
    </div>
  );
};
