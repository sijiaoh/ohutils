import 'reflect-metadata';

import {Field, InputType} from 'type-graphql';

@InputType()
export class PostInput {
  @Field()
  type!: string;
  @Field()
  title!: string;
  @Field()
  text!: string;
}
