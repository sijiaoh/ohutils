import {ReactiveClass} from '@reactive-class/react';
import {produce} from 'immer';
import {apolloSdk, VoteInput, VoteType} from 'src/apollo';

export class Vote extends ReactiveClass {
  input: Readonly<VoteInput> = {title: '', text: '', voteOptions: []};
  data?: Readonly<VoteType>;

  constructor(public id?: string) {
    super();
  }

  setInput = (input: Partial<VoteInput>) => {
    this.input = produce(this.input, data => ({
      ...data,
      ...input,
    }));
  };

  create = async () => {
    const res = await apolloSdk.createVoteMutation({
      variables: {vote: this.input},
    });
    this.data = res.data?.createVote;
  };
}
