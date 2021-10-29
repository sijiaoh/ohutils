import {getConnection} from 'typeorm';
import {PostEntity, TagEntity} from '.';
import {createUser} from 'test/createUser';
import {prepareTestMysql} from 'test/prepareTestMysql';

prepareTestMysql();

describe(TagEntity.name, () => {
  const createPost = async () => {
    const user = await createUser();
    const post = await PostEntity.create({
      title: 'title',
      text: 'text',
      userId: user.id,
    }).save();
    return post;
  };

  const createTags = async () => {
    return await Promise.all(
      ['tag1', 'tag2'].map(async name => await TagEntity.create({name}).save())
    );
  };

  it('can tag post', async () => {
    const post = await createPost();
    const tags = await createTags();

    post.tags = Promise.resolve(tags);
    await post.save();

    const findPost = async () => await PostEntity.findOne();
    const findPostTags = async () => findPost().then(async post => post?.tags);

    expect((await findPostTags())?.length).toEqual(tags.length);

    post.tags = Promise.resolve([tags[0]]);
    await post.save();
    expect((await findPostTags())?.length).toEqual(1);
  });

  it('can not tag tagged post', async () => {
    const post = await createPost();
    const tags = await createTags();

    const query = getConnection()
      .createQueryBuilder()
      .insert()
      .into('post_entity_tags_tag_entity')
      .values({postEntityId: post.id, tagEntityId: tags[0].id});
    await expect(query.execute()).resolves.not.toThrowError();
    await expect(query.execute()).rejects.toThrowError();
  });
});
