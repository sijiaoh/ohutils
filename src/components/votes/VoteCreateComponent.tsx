import type {NextPage} from 'next';
import {useRouter} from 'next/dist/client/router';
import Container from 'react-bootstrap/Container';
import {BreadcrumbListComponent} from '../BreadcrumbListComponent';
import {HeadComponent} from '../HeadComponent';
import {FormComponent, FieldComponent, SubmitButtonComponent} from '../form';
import {FieldArrayComponent} from '../form/FieldArrayComponent';
import {MarkdownEditorComponent} from '../form/MarkdownEditorComponent';
import {Vote} from 'src/classes/Vote';
import {
  homeBreadcrumb,
  votePath,
  votesBreadcrumb,
  votesCreateTitle,
} from 'src/utils/pageHelpers';

export const VoteCreateComponent: NextPage = () => {
  const router = useRouter();
  const defaultValues: {
    title: string;
    text: string;
    voteOptions: {value: string}[];
  } = {title: '', text: '', voteOptions: []};

  return (
    <Container>
      <HeadComponent subTitle={votesCreateTitle} />

      <BreadcrumbListComponent
        list={[homeBreadcrumb, votesBreadcrumb, {title: votesCreateTitle}]}
      />

      <h1>{votesCreateTitle}</h1>

      <FormComponent
        defaultValues={defaultValues}
        onSubmit={async values => {
          const vote = new Vote();
          vote.setInput({
            ...values,
            voteOptions: values.voteOptions.map(({value}) => value),
          });
          await vote.create();
          if (vote.id == null) throw new Error('Failed to create vote.');
          await router.push(votePath(vote.id));
        }}
      >
        <FieldComponent label="タイトル" id="title" name="title" />

        <MarkdownEditorComponent
          id="text"
          name="text"
          label="本文"
          css={{height: '30em'}}
        />

        <FieldArrayComponent label="選択肢" name="voteOptions" />

        <SubmitButtonComponent css={{marginTop: '2em'}}>
          登録
        </SubmitButtonComponent>
      </FormComponent>
    </Container>
  );
};
