import {UnauthorizedError} from 'type-graphql';
import {EntityNotFoundError} from '../EntityNotFoundError';
import {PostResolver} from '.';
import type {PostInputType} from 'src/apollo';
import {prisma} from 'src/database/prisma';
import {createUserWithSocialProfile} from 'test/createUserWithSocialProfile';
import {getSignedTestSdk} from 'test/getSignedTestSdk';

import 'test/prepareTestDatabase';

const postProps: PostInputType = {
  title: 'title',
  text: 'text',
  copyProtect: true,
  tags: [],
};

describe(PostResolver.name, () => {
  describe(PostResolver.prototype.post.name, () => {
    it('should return post if exists', async () => {
      const user = await createUserWithSocialProfile();
      const sdk = await getSignedTestSdk(user);
      const tagNames = ['tag1', 'tag2'];

      const createPostRes = await sdk.createPostMutation({
        variables: {
          post: {...postProps, tags: tagNames},
        },
      });

      const postRes = await sdk.postQuery({
        variables: {id: createPostRes.data!.createPost.id},
      });
      expect(postRes.data.post.id).toBe(createPostRes.data?.createPost.id);
    });

    it('should return error if not exists', async () => {
      const user = await createUserWithSocialProfile();
      const sdk = await getSignedTestSdk(user);
      const {errors} = await sdk.postQuery({variables: {id: 'invalid id'}});
      expect(errors?.[0]?.message).toBe(new EntityNotFoundError().message);
    });
  });

  describe(PostResolver.prototype.posts.name, () => {
    it('should return posts', async () => {
      const user = await createUserWithSocialProfile();
      const sdk = await getSignedTestSdk(user);

      const tagNames = ['tag1', 'tag2'];
      for (let i = 0; i < 5; i++) {
        await sdk.createPostMutation({
          variables: {post: {...postProps, tags: tagNames}},
        });
      }

      const postsRes = await sdk.postsQuery({variables: {order: {}}});
      expect(postsRes.data.posts.length).toBe(5);
    });
  });

  describe(PostResolver.prototype.createPost.name, () => {
    it('can create post without tags', async () => {
      const user = await createUserWithSocialProfile();
      const sdk = await getSignedTestSdk(user);
      const res = await sdk.createPostMutation({
        variables: {
          post: postProps,
        },
      });
      expect(res.data?.createPost.id).toBeTruthy();

      const post = await prisma.post.findFirst({include: {tags: true}});
      expect({
        title: post?.title,
        text: post?.text,
        copyProtect: post?.copyProtect,
        tags: [],
      }).toEqual(postProps);

      const tags = post?.tags;
      expect(tags?.length).toBe(0);
    });

    it('can create post with tags', async () => {
      const tagNames = ['tag1', 'tag2'];

      const user = await createUserWithSocialProfile();
      const sdk = await getSignedTestSdk(user);
      const res = await sdk.createPostMutation({
        variables: {
          post: {...postProps, tags: tagNames},
        },
      });
      expect(res.data?.createPost.id).toBeTruthy();

      const post = await prisma.post.findFirst({include: {tags: true}});
      expect({
        title: post?.title,
        text: post?.text,
        copyProtect: post?.copyProtect,
        tags: [],
      }).toEqual(postProps);

      const tags = post?.tags;
      expect(tags?.map(tag => tag.name).sort()).toEqual(tagNames.sort());
      expect(tags?.length).toBe(2);
    });

    it('can create post with exists tags', async () => {
      const tagNames = ['tag1', 'tag2'];

      const user = await createUserWithSocialProfile();
      const sdk = await getSignedTestSdk(user);

      let res = await sdk.createPostMutation({
        variables: {
          post: {...postProps, tags: tagNames},
        },
      });
      expect(res.data?.createPost.id).toBeTruthy();

      res = await sdk.createPostMutation({
        variables: {
          post: {...postProps, tags: [...tagNames, 'tag3']},
        },
      });
      expect(res.data?.createPost.id).toBeTruthy();

      expect(await prisma.tag.count()).toBe(3);
    });
  });

  describe(PostResolver.prototype.updatePost.name, () => {
    it('should update exists post', async () => {
      const user = await createUserWithSocialProfile();
      const sdk = await getSignedTestSdk(user);

      const createPostRes = await sdk.createPostMutation({
        variables: {
          post: {title: 'title', text: 'text', copyProtect: true, tags: []},
        },
      });
      const id = createPostRes.data!.createPost.id;

      const newPostData = {
        title: 'title2',
        text: 'text2',
        copyProtect: true,
        tags: ['newTag'],
      };

      const updatePostRes = await sdk.updatePostMutation({
        variables: {id, post: newPostData},
      });
      const {title, text, copyProtect, tags} = updatePostRes.data!.updatePost;
      expect({title, text, copyProtect, tags}).toEqual(newPostData);
    });

    it('can remove all tags', async () => {
      const user = await createUserWithSocialProfile();
      const sdk = await getSignedTestSdk(user);

      const createPostRes = await sdk.createPostMutation({
        variables: {
          post: {
            title: 'title',
            text: 'text',
            copyProtect: true,
            tags: ['tag1', 'tag2'],
          },
        },
      });
      const id = createPostRes.data!.createPost.id;

      const newPostData = {
        title: 'title2',
        text: 'text2',
        copyProtect: true,
        tags: [],
      };

      const updatePostRes = await sdk.updatePostMutation({
        variables: {id, post: newPostData},
      });
      const {title, text, copyProtect, tags} = updatePostRes.data!.updatePost;
      expect({title, text, copyProtect, tags}).toEqual(newPostData);
    });
  });

  describe(PostResolver.prototype.removePost.name, () => {
    it('should remove post', async () => {
      const user = await createUserWithSocialProfile();
      const sdk = await getSignedTestSdk(user);

      const createPostRes = await sdk.createPostMutation({
        variables: {
          post: {title: 'title', text: 'text', copyProtect: true, tags: []},
        },
      });
      expect(createPostRes.data?.createPost.id).toBeTruthy();

      const removePostRes = await sdk.removePostMutation({
        variables: {
          id: createPostRes.data!.createPost.id,
        },
      });
      expect(removePostRes.data?.removePost).toBeTruthy();

      expect(await prisma.post.count()).toBe(0);
    });

    it('should throw error when user is not owner', async () => {
      const owner = await createUserWithSocialProfile();
      const ownerSdk = await getSignedTestSdk(owner);

      const createPostRes = await ownerSdk.createPostMutation({
        variables: {
          post: {title: 'title', text: 'text', copyProtect: true, tags: []},
        },
      });
      expect(createPostRes.data?.createPost.id).toBeTruthy();

      const user = await createUserWithSocialProfile();
      const userSdk = await getSignedTestSdk(user);

      const {errors} = await userSdk.removePostMutation({
        variables: {
          id: createPostRes.data!.createPost.id,
        },
      });
      expect(errors?.[0]?.message).toBe(new UnauthorizedError().message);

      expect(await prisma.post.count()).toBe(1);
    });
  });
});
