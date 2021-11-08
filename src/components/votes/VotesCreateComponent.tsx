import {useListen} from '@reactive-class/react';
import type {NextPage} from 'next';
import {useRouter} from 'next/dist/client/router';
import {useRef} from 'react';
import Container from 'react-bootstrap/Container';
import {BreadcrumbListComponent} from '../BreadcrumbListComponent';
import {HeadComponent} from '../HeadComponent';
import {FormComponent, FieldComponent, SubmitButtonComponent} from '../form';
import {FieldArrayComponent} from '../form/FieldArrayComponent';
import {MarkdownEditorComponent} from '../form/MarkdownEditorComponent';
import {Vote} from 'src/classes/Vote';
import {homeBreadcrumb} from 'src/pages';
import {votePath} from 'src/pages/vote/[id]';
import {votesBreadcrumb} from 'src/pages/votes';
import {votesCreateTitle} from 'src/pages/votes/create';

export const VotesCreateComponent: NextPage = () => {
  const router = useRouter();
  const defaultValues: {
    title: string;
    text: string;
    voteOptions: {value: string}[];
  } = {title: '', text: '', voteOptions: []};
  const vote = useRef(new Vote()).current;
  const voteData = useListen(vote);

  return (
    <Container>
      <HeadComponent subTitle={votesCreateTitle} />

      <BreadcrumbListComponent
        list={[homeBreadcrumb, votesBreadcrumb, {title: votesCreateTitle}]}
      />

      <h1>{votesCreateTitle}</h1>

      <FormComponent
        defaultValues={defaultValues}
        onChange={values => {
          vote.setInput({
            ...values,
            voteOptions: values.voteOptions.map(({value}) => value),
          });
        }}
        onSubmit={async values => {
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
          text={voteData.input.text}
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
