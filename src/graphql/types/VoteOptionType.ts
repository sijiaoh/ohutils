import 'reflect-metadata';

import {Field, ObjectType} from 'type-graphql';

@ObjectType()
export class VoteOptionType {
  @Field()
  id!: string;
  @Field()
  name!: string;
}
