import 'reflect-metadata';

import {Field, ObjectType} from 'type-graphql';
import {VoteOptionType} from './VoteOptionType';

@ObjectType()
export class VoteType {
  @Field()
  id!: string;
  @Field()
  title!: string;
  @Field()
  text!: string;
  @Field(() => [VoteOptionType])
  voteOptions!: VoteOptionType[];
  @Field()
  createdAt!: Date;
  @Field()
  updatedAt!: Date;
}
