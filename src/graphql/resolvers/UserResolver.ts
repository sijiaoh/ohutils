import 'reflect-metadata';

import {Authorized, Ctx, Query, Resolver} from 'type-graphql';
import {UserType} from '../types/UserType';
import {Context} from 'src/utils/Context';
import {getUser} from 'src/utils/getUser';

@Resolver()
export class UserResolver {
  @Query(() => UserType)
  @Authorized()
  me(@Ctx() {req}: Context): UserType {
    return getUser(req);
  }
}
