import 'reflect-metadata';

import {Field, InputType} from 'type-graphql';

@InputType()
export class VoteInputType {
  @Field()
  title!: string;
  @Field()
  text!: string;
  @Field(() => [String])
  voteOptions!: string[];
}
