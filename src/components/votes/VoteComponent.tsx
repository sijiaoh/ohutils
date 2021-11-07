import {useListen} from '@reactive-class/react';
import {useRouter} from 'next/dist/client/router';
import {useEffect, useRef} from 'react';
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
  if (typeof id !== 'string') throw new Error('id is not providing.');
  const vote = useRef(new Vote(id)).current;
  const voteData = useListen(vote, ({data}) => data);
  const meData = useListen(Me.useMe(), ({data}) => data);

  useEffect(() => {
    void vote.load();
  }, [vote]);

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
          <li key={voteOption.id}>
            <div>{voteOption.name}</div>
          </li>
        ))}
      </ul>

      <MarkdownComponent text={voteData.text}></MarkdownComponent>
    </Container>
  );
};
