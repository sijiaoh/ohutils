import 'reflect-metadata';

import {Field, InputType} from 'type-graphql';
import {Order} from '../enum/Order';

@InputType()
export class PostsOrderInput {
  @Field(() => Order, {nullable: true})
  title?: Order;
  @Field(() => Order, {nullable: true})
  createdAt?: Order;
  @Field(() => Order, {nullable: true})
  updatedAt?: Order;
}
