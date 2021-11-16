import {ReactiveClass} from '@reactive-class/react';
import {produce} from 'immer';
import localforage from 'localforage';
import {apolloSdk, VoteInputType, VoteType} from 'src/apollo';

export class Vote extends ReactiveClass {
  static votedListKey = 'votedList';

  input: Readonly<VoteInputType> = {title: '', text: '', voteOptions: []};
  data?: Readonly<VoteType>;
  voted = true;

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

    const votedList = await localforage.getItem<string[]>(Vote.votedListKey);
    this.voted = !!votedList?.some(voted => voted === this.id);
  };

  voteTo = async (voteOptionId: string) => {
    if (this.data == null) return;
    if (this.voted) return;
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

    const votedList =
      (await localforage.getItem<string[]>(Vote.votedListKey)) || [];
    await localforage.setItem(Vote.votedListKey, [...votedList, this.id]);
    this.voted = true;
  };

  remove = async () => {
    if (!this.id) return;
    await apolloSdk.removeVoteMutation({variables: {id: this.id}});
    this.data = undefined;
    this.id = undefined;
  };
}
