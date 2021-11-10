import {getConnection} from 'typeorm';
import {PostEntity, TagEntity} from '.';
import {createUserWithSocialProfile} from 'test/createUserWithSocialProfile';
import {prepareTestMysql} from 'test/prepareTestMysql';

prepareTestMysql();

describe(TagEntity.name, () => {
  const createPost = async () => {
    const user = await createUserWithSocialProfile();
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

    post.tags = tags;
    await post.save();

    const findPost = async () =>
      await PostEntity.findOne({relations: ['tags']});

    expect((await findPost())?.tags?.length).toEqual(tags.length);

    post.tags = [tags[0]!];
    await post.save();
    expect((await findPost())?.tags?.length).toEqual(1);
  });

  it('can not tag tagged post', async () => {
    const post = await createPost();
    const tags = await createTags();

    const query = getConnection()
      .createQueryBuilder()
      .insert()
      .into('post_entity_tags_tag_entity')
      .values({postEntityId: post.id, tagEntityId: tags[0]!.id});
    await expect(query.execute()).resolves.not.toThrowError();
    await expect(query.execute()).rejects.toThrowError();
  });

  describe('validate', () => {
    const createWithName = async (name: string) => {
      return await TagEntity.create({name})
        .save()
        .catch(err => err);
    };

    it('name should be provide', async () => {
      const errors = await createWithName('');
      expect(errors.length).toBe(1);
    });

    it('should not contain \\s in name', async () => {
      let errors = await createWithName('a a');
      expect(errors.length).toBe(1);
      errors = await createWithName('a\ta');
      expect(errors.length).toBe(1);
      errors = await createWithName('a\na');
      expect(errors.length).toBe(1);
    });
  });
});
