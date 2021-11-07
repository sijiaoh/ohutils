import 'reflect-metadata';

import {Field, ObjectType} from 'type-graphql';

@ObjectType()
export class MeType {
  @Field(() => [String])
  linkedProviders!: string[];
}
