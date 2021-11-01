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
import {PostInput} from '../input-types/PostInput';
import {PostType} from '../types/PostType';
import {PostEntity, TagEntity} from 'src/database/entities';
import {Context} from 'src/utils/Context';
import {getUser} from 'src/utils/getUser';

@Resolver()
export class PostResolver {
  @Query(() => PostType)
  async post(@Arg('id') id: string): Promise<PostType> {
    const post = await PostEntity.findOne(id, {relations: ['tags']});
    if (!post) throw new EntityNotFoundError();
    if (!post.tags) throw new Error('Failed to load tags.');
    return {
      ...post,
      tags: post.tags.map(tag => tag.name),
    };
  }

  @Query(() => [PostType])
  async posts(): Promise<PostType[]> {
    const posts = await PostEntity.find();
    const res = posts.map(post => ({
      id: post.id,
      title: post.title,
      text: post.text,
      tags: post.tags?.map(tag => tag.name) || [],
    }));
    return res;
  }

  @Mutation(() => PostType)
  @Authorized()
  async createPost(
    @Ctx() {req}: Context,
    @Arg('post') {title, text, tags}: PostInput
  ): Promise<PostType> {
    const user = getUser(req);

    const createdPost = await getManager().transaction(async entityManager => {
      let tagEntities: TagEntity[] = [];
      if (tags) {
        await entityManager
          .createQueryBuilder()
          .insert()
          .orIgnore()
          .into(TagEntity)
          .values(tags.map(tag => ({name: tag})))
          .execute();

        tagEntities = await entityManager.find(TagEntity, {
          where: tags.map(tag => ({name: tag})),
        });
      }

      const postEntity = entityManager.create(PostEntity, {
        userId: user.id,
        title,
        text,
      });
      await entityManager.save(postEntity);

      postEntity.tags = tagEntities;
      return await entityManager.save(postEntity);
    });

    return {...createdPost, tags: tags || []};
  }

  @Mutation(() => Boolean)
  @Authorized()
  async removePost(
    @Ctx() {req}: Context,
    @Arg('id') id: string
  ): Promise<boolean> {
    const user = getUser(req);
    const post = await PostEntity.findOne(id);

    if (!post) throw new EntityNotFoundError();
    if (post.userId !== user.id) throw new UnauthorizedError();

    await post.remove();
    return true;
  }
}
