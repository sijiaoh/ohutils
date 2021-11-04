import 'reflect-metadata';

import {Field, ObjectType} from 'type-graphql';

@ObjectType()
export class PostType {
  @Field()
  id!: string;
  @Field()
  title!: string;
  @Field()
  text!: string;
  @Field(() => [String])
  tags!: string[];
  @Field()
  createdAt!: Date;
  @Field()
  updatedAt!: Date;
}
