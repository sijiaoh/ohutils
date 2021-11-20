import 'reflect-metadata';

import {Authorized, Ctx, Query, Resolver} from 'type-graphql';
import {MeType} from '../types/MeType';
import {getPrisma} from 'src/database/prisma';
import type {Context} from 'src/utils/Context';
import {getUser} from 'src/utils/getUser';

@Resolver()
export class MeResolver {
  @Query(() => MeType)
  @Authorized()
  async me(@Ctx() {req}: Context): Promise<MeType> {
    const user = getUser(req);
    const socialProfiles = await getPrisma().socialProfile.findMany({
      where: {userId: user.id},
    });
    const linkedProviders = socialProfiles.map(
      socialProfile => socialProfile.provider
    );
    return {...user, linkedProviders};
  }
}
