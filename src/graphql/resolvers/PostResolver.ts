import 'reflect-metadata';

import {Arg, Authorized, Ctx, Mutation, Resolver} from 'type-graphql';
import {PostInput} from '../input-types/PostInput';
import {PostEntity} from 'src/database/entities';
import {Context} from 'src/utils/Context';
import {getUser} from 'src/utils/getUser';

@Resolver()
export class PostResolver {
  @Mutation(() => Boolean)
  @Authorized()
  async create(
    @Ctx() {req}: Context,
    @Arg('post') {type, title, text}: PostInput
  ): Promise<Boolean> {
    const user = getUser(req);
    await PostEntity.create({userId: user.id, type, title, text}).save();
    return true;
  }
}
