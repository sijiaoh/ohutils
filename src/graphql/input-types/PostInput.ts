import 'reflect-metadata';

import {Field, InputType} from 'type-graphql';

@InputType()
export class PostInput {
  @Field()
  title!: string;
  @Field()
  text!: string;
  @Field(() => [String])
  tags!: string[];
}
