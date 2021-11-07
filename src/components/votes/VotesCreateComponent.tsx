import type {NextPage} from 'next';
import Container from 'react-bootstrap/Container';
import {BreadcrumbListComponent} from '../BreadcrumbListComponent';
import {HeadComponent} from '../HeadComponent';
import {FormComponent, FieldComponent, SubmitButtonComponent} from '../form';
import {FieldArrayComponent} from '../form/FieldArrayComponent';
import {Vote} from 'src/classes/Vote';
import {homeBreadcrumb} from 'src/pages';
import {votesBreadcrumb} from 'src/pages/votes';
import {votesCreateTitle} from 'src/pages/votes/create';

export const VotesCreateComponent: NextPage = () => {
  const initialValues: {
    title: string;
    text: string;
    voteOptions: string[];
  } = {title: '', text: '', voteOptions: []};

  return (
    <Container>
      <HeadComponent subTitle={votesCreateTitle} />

      <BreadcrumbListComponent
        list={[homeBreadcrumb, votesBreadcrumb, {title: votesCreateTitle}]}
      />

      <h1>{votesCreateTitle}</h1>

      <FormComponent
        initialValues={initialValues}
        validate={values => {
          const errors: {[key in keyof typeof initialValues]?: string} = {};
          if (!values.title) errors.title = 'タイトルは必須です。';
          if (values.voteOptions.length <= 0)
            errors.voteOptions = '最低一つは選択肢が必要です。';
          if (values.voteOptions.some(voteOption => !voteOption))
            errors.voteOptions = '空の選択肢が存在します。';
          return errors;
        }}
        onSubmit={async values => {
          const vote = new Vote();
          vote.setInput(values);
          await vote.create();
        }}
      >
        <FieldComponent label="タイトル" id="title" name="title" />
        <FieldArrayComponent
          label="選択肢"
          id="voteOptions"
          name="voteOptions"
        />
        <SubmitButtonComponent css={{marginTop: '2em'}}>
          登録
        </SubmitButtonComponent>
      </FormComponent>
    </Container>
  );
};
