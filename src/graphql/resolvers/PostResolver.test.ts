import {PostResolver} from '.';
import {PostEntity} from 'src/database/entities';
import {createUser} from 'test/createUser';
import {getSignedTestSdk} from 'test/getSignedTestSdk';
import {prepareTestMysql} from 'test/prepareTestMysql';

prepareTestMysql();

describe(PostResolver.name, () => {
  it('can create post without tags', async () => {
    const postProps = {title: 'title', text: 'text'};

    const user = await createUser();
    const sdk = await getSignedTestSdk(user);
    const res = await sdk.createPost({
      post: postProps,
    });
    expect(res.createPost).toBeTruthy();

    const post = await PostEntity.findOne();
    expect({title: post?.title, text: post?.text}).toEqual(postProps);

    const tags = await post?.tags;
    expect(tags?.length).toBe(0);
  });

  it('can create post with tags', async () => {
    const postProps = {title: 'title', text: 'text'};
    const tagNames = ['tag1', 'tag2'];

    const user = await createUser();
    const sdk = await getSignedTestSdk(user);
    const res = await sdk.createPost({
      post: {...postProps, tags: tagNames},
    });
    expect(res.createPost).toBeTruthy();

    const post = await PostEntity.findOne();
    expect({title: post?.title, text: post?.text}).toEqual(postProps);

    const tags = await post?.tags;
    expect(tags?.map(tag => tag.name).sort()).toEqual(tagNames.sort());
    expect(tags?.length).toBe(2);
  });
});
