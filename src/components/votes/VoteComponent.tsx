import {useListen} from '@reactive-class/react';
import {useRouter} from 'next/dist/client/router';
import {useEffect, useRef} from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import {BreadcrumbListComponent} from '../BreadcrumbListComponent';
import {HeadComponent} from '../HeadComponent';
import {MarkdownComponent} from '../MarkdownComponent';
import {Me} from 'src/classes/Me';
import {Vote} from 'src/classes/Vote';
import {homeBreadcrumb} from 'src/pages';
import {voteTitle} from 'src/pages/vote/[id]';
import {votesBreadcrumb} from 'src/pages/votes';

export const VoteComponent = () => {
  const router = useRouter();
  const {id} = router.query;
  const vote = useRef(new Vote()).current;
  const voteData = useListen(vote, ({data}) => data);
  const meData = useListen(Me.useMe(), ({data}) => data);

  useEffect(() => {
    if (typeof id !== 'string') return;
    vote.id = id;
    void vote.load();
  }, [id, vote]);

  if (!voteData) return <div>Loading...</div>;
  return (
    <Container>
      <HeadComponent subTitle={voteTitle(voteData.title)} />

      <BreadcrumbListComponent
        list={[
          homeBreadcrumb,
          votesBreadcrumb,
          {title: voteTitle(voteData.title)},
        ]}
      />

      <h1>{voteTitle(voteData.title)}</h1>

      {meData && (
        <div>
          {/* <Link href={votesEditPath(id)}>{votesEditTitle}</Link> */}
          TODO
        </div>
      )}

      <ul>
        {voteData.voteOptions.map(voteOption => (
          <li key={voteOption.id} css={{display: 'flex', alignItems: 'center'}}>
            <div>{voteOption.name}</div>
            <div>{voteOption.numberOfVotes}</div>
            <Button
              onClick={async () => {
                await vote.voteTo(voteOption.id);
              }}
            >
              +
            </Button>
          </li>
        ))}
      </ul>

      <MarkdownComponent text={voteData.text}></MarkdownComponent>
    </Container>
  );
};
