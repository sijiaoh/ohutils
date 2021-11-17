import 'reflect-metadata';

import {
  Arg,
  Authorized,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UnauthorizedError,
} from 'type-graphql';
import {getManager} from 'typeorm';
import {EntityNotFoundError} from '../EntityNotFoundError';
import {Order} from '../enum/Order';
import {VoteInputType} from '../input-types/VoteInputType';
import {VotesOrderInputType} from '../input-types/VotesOrderInputType';
import {VoteOptionType} from '../types/VoteOptionType';
import {VoteType} from '../types/VoteType';
import {VoteEntity, VoteOptionEntity} from 'src/database/entities';
import type {Context} from 'src/utils/Context';
import {getUser} from 'src/utils/getUser';

@Resolver()
export class VoteResolver {
  @Query(() => VoteType)
  async vote(@Arg('id') id: string): Promise<VoteType> {
    const vote = await VoteEntity.findOne(id, {relations: ['voteOptions']});
    if (!vote) throw new EntityNotFoundError();
    if (!vote.voteOptions) throw new Error('Failed to load tags.');
    return {...vote, voteOptions: vote.voteOptions};
  }

  @Query(() => VoteOptionType)
  async voteTo(
    @Arg('voteOptionId') voteOptionId: string
  ): Promise<VoteOptionType> {
    await getManager()
      .createQueryBuilder()
      .update(VoteOptionEntity)
      .set({numberOfVotes: () => 'numberOfVotes + 1'})
      .where('id = :id', {id: voteOptionId})
      .execute();
    const voteOption = await VoteOptionEntity.findOne(voteOptionId);
    if (!voteOption) throw new Error('Failed to load voteOption.');
    return voteOption;
  }

  @Query(() => [VoteType])
  async votes(@Arg('order') order: VotesOrderInputType): Promise<VoteType[]> {
    const o = Object.entries(order).reduce<{[key: string]: string}>(
      (obj, [key, value]) => {
        if (value == null) return obj;
        const v = Order[value]?.toString();
        if (v != null) obj[key] = Order[value]!.toString();
        return obj;
      },
      {}
    );
    const votes = await VoteEntity.find({order: o, relations: ['voteOptions']});
    const res = votes.map(vote => ({
      ...vote,
      voteOptions: vote.voteOptions!,
    }));
    return res;
  }

  @Mutation(() => VoteType)
  @Authorized()
  async createVote(
    @Ctx() {req}: Context,
    @Arg('vote') {title, text, voteOptions}: VoteInputType
  ): Promise<VoteType> {
    const user = getUser(req);
    if (!voteOptions.length) throw new Error('voteOptions is required.');

    const createdVote = await getManager().transaction(async entityManager => {
      const voteOptionEntities = voteOptions.map((voteOption, index) =>
        VoteOptionEntity.build({
          order: index,
          name: voteOption,
          numberOfVotes: 0,
        })
      );
      await entityManager.save(voteOptionEntities);

      const voteEntity = VoteEntity.build({
        userId: user.id,
        title,
        text,
      });
      await entityManager.save(voteEntity);

      voteEntity.voteOptions = voteOptionEntities;
      return await entityManager.save(voteEntity);
    });

    if (!createdVote.voteOptions) throw new Error('');
    return {...createdVote, voteOptions: createdVote.voteOptions!};
  }

  @Mutation(() => Boolean)
  @Authorized()
  async removeVote(
    @Ctx() {req}: Context,
    @Arg('id') id: string
  ): Promise<boolean> {
    const user = getUser(req);
    const vote = await VoteEntity.findOne(id);

    if (!vote) throw new EntityNotFoundError();
    if (vote.userId !== user.id) throw new UnauthorizedError();

    await vote.remove();
    return true;
  }
}
