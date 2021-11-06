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
import {VoteInput} from '../input-types/VoteInput';
import {VotesOrderInput} from '../input-types/VotesOrderInput';
import {VoteType} from '../types/VoteType';
import {VoteEntity, VoteOptionEntity} from 'src/database/entities';
import {Context} from 'src/utils/Context';
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

  @Query(() => [VoteType])
  async posts(@Arg('order') order: VotesOrderInput): Promise<VoteType[]> {
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
  async createPost(
    @Ctx() {req}: Context,
    @Arg('vote') {title, text, voteOptions}: VoteInput
  ): Promise<VoteType> {
    const user = getUser(req);
    if (!voteOptions.length) throw new Error('voteOptions is required.');

    const createdVote = await getManager().transaction(async entityManager => {
      const voteOptionEntities = entityManager.create(
        VoteOptionEntity,
        voteOptions.map((voteOption, index) => ({
          order: index,
          name: voteOption,
        }))
      );
      await entityManager.save(voteOptionEntities);

      const voteEntity = entityManager.create(VoteEntity, {
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
