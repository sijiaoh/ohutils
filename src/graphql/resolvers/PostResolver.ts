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
import {PostInputType} from '../input-types/PostInputType';
import {PostsOrderInputType} from '../input-types/PostsOrderInputType';
import {PostType} from '../types/PostType';
import {prisma} from 'src/database/prisma';
import type {Context} from 'src/utils/Context';
import {getUser} from 'src/utils/getUser';

@Resolver()
export class PostResolver {
  @Query(() => PostType)
  async post(@Arg('id') id: string): Promise<PostType> {
    const post = await prisma.post.findUnique({
      where: {id},
      include: {tags: true},
    });
    if (!post) throw new EntityNotFoundError();
    if (!post.tags) throw new Error('Failed to load tags.');
    return {
      ...post,
      tags: post.tags.map(tag => tag.name),
    };
  }

  @Query(() => [PostType])
  async posts(@Arg('order') order: PostsOrderInputType): Promise<PostType[]> {
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
    const posts = await prisma.post.findMany({
      orderBy: o,
      include: {tags: true},
    });
    const res = posts.map(post => ({
      ...post,
      tags: post.tags.map(tag => tag.name),
    }));
    return res;
  }

  @Mutation(() => PostType)
  @Authorized()
  async createPost(
    @Ctx() {req}: Context,
    @Arg('post') {title, text, copyProtect, tags}: PostInputType
  ): Promise<PostType> {
    const user = getUser(req);

    const post = await prisma.post.create({
      data: {
        title,
        text,
        copyProtect,
        user: {connect: {id: user.id}},
        tags: {
          connectOrCreate: tags.map(tag => ({
            where: {name: tag},
            create: {name: tag},
          })),
        },
      },
      include: {tags: true},
    });

    return {...post, tags: post.tags.map(({name}) => name)};
  }

  @Mutation(() => PostType)
  @Authorized()
  async updatePost(
    @Ctx() {req}: Context,
    @Arg('id') id: string,
    @Arg('post') {title, text, copyProtect, tags}: PostInputType
  ): Promise<PostType> {
    const user = getUser(req);

    const post = await prisma.post.findUnique({
      where: {id},
      include: {tags: true},
    });

    if (!post) throw new EntityNotFoundError();
    if (post.userId !== user.id) throw new UnauthorizedError();

    const updatedPost = await prisma.post.update({
      where: {id},
      data: {
        title,
        text,
        copyProtect,
        tags: {
          connectOrCreate: tags.map(tag => ({
            create: {name: tag},
            where: {name: tag},
          })),
          disconnect: post.tags
            .filter(({name}) => !tags.includes(name))
            .map(({id}) => ({id})),
        },
      },
      include: {tags: true},
    });

    return {...updatedPost, tags: updatedPost.tags.map(({name}) => name)};
  }

  @Mutation(() => Boolean)
  @Authorized()
  async removePost(
    @Ctx() {req}: Context,
    @Arg('id') id: string
  ): Promise<boolean> {
    const user = getUser(req);
    const post = await prisma.post.findUnique({where: {id}});

    if (!post) throw new EntityNotFoundError();
    if (post.userId !== user.id) throw new UnauthorizedError();

    await prisma.post.delete({where: {id: post.id}});
    return true;
  }
}
