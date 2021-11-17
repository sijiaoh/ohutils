import {UnauthorizedError} from 'type-graphql';
import {EntityNotFoundError} from '../EntityNotFoundError';
import {PostResolver} from '.';
import {PostEntity, TagEntity} from 'src/database/entities';
import {createUserWithSocialProfile} from 'test/createUserWithSocialProfile';
import type {PostInputType} from 'test/generated/generic-sdk';
import {getSignedTestSdk} from 'test/getSignedTestSdk';
import {prepareTestMysql} from 'test/prepareTestMysql';

prepareTestMysql();

describe(PostResolver.name, () => {
  describe(PostResolver.prototype.post.name, () => {
    it('should return post if exists', async () => {
      const user = await createUserWithSocialProfile();
      const sdk = await getSignedTestSdk(user);
      const postProps: PostInputType = {
        title: 'title',
        text: 'text',
        copyProtect: true,
        tags: [],
      };
      const tagNames = ['tag1', 'tag2'];

      const createPostRes = await sdk.createPost({
        post: {...postProps, tags: tagNames},
      });

      const postRes = await sdk.post({id: createPostRes.createPost.id});
      expect(postRes.post.id).toBe(createPostRes.createPost.id);
    });

    it('should return error if not exists', async () => {
      const user = await createUserWithSocialProfile();
      const sdk = await getSignedTestSdk(user);
      const errors = await sdk.post({id: 'invalid id'}).catch(err => err);
      expect(errors[0].message).toBe(new EntityNotFoundError().message);
    });
  });

  describe(PostResolver.prototype.posts.name, () => {
    it('should return posts', async () => {
      const user = await createUserWithSocialProfile();
      const sdk = await getSignedTestSdk(user);

      const postProps: PostInputType = {
        title: 'title',
        text: 'text',
        copyProtect: true,
        tags: [],
      };
      const tagNames = ['tag1', 'tag2'];
      for (let i = 0; i < 5; i++) {
        await sdk.createPost({
          post: {...postProps, tags: tagNames},
        });
      }

      const postsRes = await sdk.posts({order: {}});
      expect(postsRes.posts.length).toBe(5);
    });
  });

  describe(PostResolver.prototype.createPost.name, () => {
    it('can create post without tags', async () => {
      const postProps: PostInputType = {
        title: 'title',
        text: 'text',
        copyProtect: true,
        tags: [],
      };

      const user = await createUserWithSocialProfile();
      const sdk = await getSignedTestSdk(user);
      const res = await sdk.createPost({
        post: postProps,
      });
      expect(res.createPost.id).toBeTruthy();

      const post = await PostEntity.findOne({relations: ['tags']});
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
      const postProps: PostInputType = {
        title: 'title',
        text: 'text',
        copyProtect: true,
        tags: [],
      };
      const tagNames = ['tag1', 'tag2'];

      const user = await createUserWithSocialProfile();
      const sdk = await getSignedTestSdk(user);
      const res = await sdk.createPost({
        post: {...postProps, tags: tagNames},
      });
      expect(res.createPost.id).toBeTruthy();

      const post = await PostEntity.findOne({relations: ['tags']});
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
      const postProps: PostInputType = {
        title: 'title',
        text: 'text',
        copyProtect: true,
        tags: [],
      };
      const tagNames = ['tag1', 'tag2'];

      const user = await createUserWithSocialProfile();
      const sdk = await getSignedTestSdk(user);

      let res = await sdk.createPost({
        post: {...postProps, tags: tagNames},
      });
      expect(res.createPost.id).toBeTruthy();

      res = await sdk.createPost({
        post: {...postProps, tags: [...tagNames, 'tag3']},
      });
      expect(res.createPost.id).toBeTruthy();

      expect(await TagEntity.count()).toBe(3);
    });
  });

  describe(PostResolver.prototype.updatePost.name, () => {
    it('should update exists post', async () => {
      const user = await createUserWithSocialProfile();
      const sdk = await getSignedTestSdk(user);

      const {
        createPost: {id},
      } = await sdk.createPost({
        post: {title: 'title', text: 'text', copyProtect: true, tags: []},
      });

      const newPostData = {
        title: 'title2',
        text: 'text2',
        copyProtect: true,
        tags: ['newTag'],
      };

      const updatePostRes = await sdk.updatePost({id, post: newPostData});
      const {title, text, copyProtect, tags} = updatePostRes.updatePost;
      expect({title, text, copyProtect, tags}).toEqual(newPostData);
    });

    it('can remove all tags', async () => {
      const user = await createUserWithSocialProfile();
      const sdk = await getSignedTestSdk(user);

      const {
        createPost: {id},
      } = await sdk.createPost({
        post: {
          title: 'title',
          text: 'text',
          copyProtect: true,
          tags: ['tag1', 'tag2'],
        },
      });

      const newPostData = {
        title: 'title2',
        text: 'text2',
        copyProtect: true,
        tags: [],
      };

      const updatePostRes = await sdk.updatePost({id, post: newPostData});
      const {title, text, copyProtect, tags} = updatePostRes.updatePost;
      expect({title, text, copyProtect, tags}).toEqual(newPostData);
    });
  });

  describe(PostResolver.prototype.removePost.name, () => {
    it('should remove post', async () => {
      const user = await createUserWithSocialProfile();
      const sdk = await getSignedTestSdk(user);

      const createPostRes = await sdk.createPost({
        post: {title: 'title', text: 'text', copyProtect: true, tags: []},
      });
      expect(createPostRes.createPost.id).toBeTruthy();

      const removePostRes = await sdk.removePost({
        id: createPostRes.createPost.id,
      });
      expect(removePostRes.removePost).toBeTruthy();

      expect(await PostEntity.count()).toBe(0);
    });

    it('should throw error when user is not owner', async () => {
      const owner = await createUserWithSocialProfile();
      const ownerSdk = await getSignedTestSdk(owner);

      const createPostRes = await ownerSdk.createPost({
        post: {title: 'title', text: 'text', copyProtect: true, tags: []},
      });
      expect(createPostRes.createPost.id).toBeTruthy();

      const user = await createUserWithSocialProfile();
      const userSdk = await getSignedTestSdk(user);

      const errors = await userSdk
        .removePost({id: createPostRes.createPost.id})
        .catch(err => err);
      expect(errors[0].message).toBe(new UnauthorizedError().message);

      expect(await PostEntity.count()).toBe(1);
    });
  });
});
