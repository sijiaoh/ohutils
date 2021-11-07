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

  voteTo = async (voteOptionId: string) => {
    if (this.data == null) return;
    if (
      this.data.voteOptions.every(voteOption => voteOption.id !== voteOptionId)
    )
      throw new Error('Illegal voteOptionId.');

    const res = await apolloSdk.voteToQuery({variables: {voteOptionId}});
    this.data = produce(this.data, data => {
      const index = data.voteOptions.findIndex(
        voteOption => voteOption.id === voteOptionId
      );
      data.voteOptions.splice(index, 1, res.data.voteTo);
    });
  };
}
