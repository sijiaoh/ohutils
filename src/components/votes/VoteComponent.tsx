import {useListen} from '@reactive-class/react';
import {useRouter} from 'next/dist/client/router';
import {useEffect, useRef, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import {BreadcrumbListComponent} from '../BreadcrumbListComponent';
import {HeadComponent} from '../HeadComponent';
import {MarkdownComponent} from '../MarkdownComponent';
import {Vote} from 'src/classes/Vote';
import {homeBreadcrumb} from 'src/pages';
import {voteTitle} from 'src/pages/vote/[id]';
import {votesBreadcrumb} from 'src/pages/votes';

export const VoteComponent = () => {
  const router = useRouter();
  const {id} = router.query;
  const vote = useRef(new Vote()).current;
  const voteData = useListen(vote, ({data}) => data);
  const totalNumberOfVotes = useListen(vote, ({data}) => {
    return (
      data?.voteOptions.reduce(
        (sum, voteOption) => sum + voteOption.numberOfVotes,
        0
      ) || 0
    );
  });

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

      <ul>
        {voteData.voteOptions.map(voteOption => (
          <li key={voteOption.id} css={{display: 'flex', alignItems: 'center'}}>
            <div css={{width: '15%', padding: '0 0.2em'}}>
              {voteOption.name}
            </div>
            <div css={{width: '5%', padding: '0 0.2em'}}>
              {voteOption.numberOfVotes}
            </div>
            <div css={{flex: 1, padding: '0 1em'}}>
              {totalNumberOfVotes > 0 && (
                <div
                  css={{
                    backgroundColor: 'blue',
                    width: `${
                      (voteOption.numberOfVotes / totalNumberOfVotes) * 100
                    }%`,
                    height: '1em',
                  }}
                />
              )}
            </div>
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
