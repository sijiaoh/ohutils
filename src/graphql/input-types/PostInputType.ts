import 'reflect-metadata';

import {Field, InputType} from 'type-graphql';

@InputType()
export class PostInputType {
  @Field()
  title!: string;
  @Field()
  text!: string;
  @Field(() => [String])
  tags!: string[];
}
