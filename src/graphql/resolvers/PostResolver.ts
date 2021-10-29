import 'reflect-metadata';

import {Arg, Authorized, Ctx, Mutation, Resolver} from 'type-graphql';
import {getManager} from 'typeorm';
import {PostInput} from '../input-types/PostInput';
import {PostEntity, TagEntity} from 'src/database/entities';
import {Context} from 'src/utils/Context';
import {getUser} from 'src/utils/getUser';

@Resolver()
export class PostResolver {
  @Mutation(() => Boolean)
  @Authorized()
  async createPost(
    @Ctx() {req}: Context,
    @Arg('post') {title, text, tags}: PostInput
  ): Promise<Boolean> {
    const user = getUser(req);

    await getManager().transaction(async entityManager => {
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

      postEntity.tags = Promise.resolve(tagEntities);
      await entityManager.save(postEntity);
    });
    return true;
  }
}
