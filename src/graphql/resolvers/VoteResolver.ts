import 'reflect-metadata';

import {Prisma} from '@prisma/client';
import {
  Arg,
  Authorized,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UnauthorizedError,
} from 'type-graphql';
import {EntityNotFoundError} from '../EntityNotFoundError';
import {Order} from '../enum/Order';
import {VoteInputType} from '../input-types/VoteInputType';
import {VotesOrderInputType} from '../input-types/VotesOrderInputType';
import {VoteOptionType} from '../types/VoteOptionType';
import {VoteType} from '../types/VoteType';
import {prisma} from 'src/database/prisma';
import type {Context} from 'src/utils/Context';
import {getUser} from 'src/utils/getUser';

@Resolver()
export class VoteResolver {
  @Query(() => VoteType)
  async vote(@Arg('id') id: string): Promise<VoteType> {
    const vote = await prisma.vote.findUnique({
      where: {id},
      include: {voteOptions: true},
    });
    if (!vote) throw new EntityNotFoundError();
    return vote;
  }

  @Query(() => VoteOptionType)
  async voteTo(
    @Arg('voteOptionId') voteOptionId: string
  ): Promise<VoteOptionType> {
    return await prisma.voteOption.update({
      where: {id: voteOptionId},
      data: {numberOfVotes: {increment: 1}},
    });
  }

  @Query(() => [VoteType])
  async votes(@Arg('order') order: VotesOrderInputType): Promise<VoteType[]> {
    const o = Object.entries(order).reduce<{[key: string]: Prisma.SortOrder}>(
      (obj, [key, value]) => {
        if (value == null) return obj;
        const v = Order[value]?.toString();
        if (v != null) {
          if (Order[value]!.toString() === 'ASC')
            obj[key] = Prisma.SortOrder.asc;
          else obj[key] = Prisma.SortOrder.desc;
        }
        return obj;
      },
      {}
    );
    return await prisma.vote.findMany({
      orderBy: o,
      include: {voteOptions: true},
    });
  }

  @Mutation(() => VoteType)
  @Authorized()
  async createVote(
    @Ctx() {req}: Context,
    @Arg('vote') {title, text, voteOptions}: VoteInputType
  ): Promise<VoteType> {
    const user = getUser(req);
    if (!voteOptions.length) throw new Error('voteOptions is required.');

    return await prisma.vote.create({
      data: {
        title,
        text,
        user: {connect: {id: user.id}},
        voteOptions: {
          create: voteOptions.map((voteOption, index) => ({
            name: voteOption,
            order: index,
          })),
        },
      },
      include: {voteOptions: true},
    });
  }

  @Mutation(() => Boolean)
  @Authorized()
  async removeVote(
    @Ctx() {req}: Context,
    @Arg('id') id: string
  ): Promise<boolean> {
    const user = getUser(req);
    const vote = await prisma.vote.findUnique({where: {id}});

    if (!vote) throw new EntityNotFoundError();
    if (vote.userId !== user.id) throw new UnauthorizedError();

    await prisma.vote.delete({where: {id: vote.id}});
    return true;
  }
}
