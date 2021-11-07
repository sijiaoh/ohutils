import {ReactiveClass} from '@reactive-class/react';
import {produce} from 'immer';
import {apolloSdk, VoteInputType, VoteType} from 'src/apollo';

export class Vote extends ReactiveClass {
  input: Readonly<VoteInputType> = {title: '', text: '', voteOptions: []};
  data?: Readonly<VoteType>;

  constructor(public id?: string) {
    super();
  }

  setInput = (input: Partial<VoteInputType>) => {
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
    this.id = this.data?.id;
  };

  load = async () => {
    if (!this.id) return;
    const res = await apolloSdk.voteQuery({variables: {id: this.id}});
    this.data = res.data.vote;
  };
}
