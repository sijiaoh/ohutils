import {getPrisma} from './prisma';
import {createUserWithSocialProfile} from 'test/createUserWithSocialProfile';
import {prepareTestMysql} from 'test/prepareTestMysql';

prepareTestMysql();

describe('Tag', () => {
  const createPost = async () => {
    const user = await createUserWithSocialProfile();
    const post = await getPrisma().post.create({
      data: {
        userId: user.id,
        title: 'title',
        text: 'text',
        copyProtect: true,
      },
    });
    return post;
  };

  const createTags = async () => {
    const data = ['tag1', 'tag2'].map(name => ({name}));
    await getPrisma().tag.createMany({data});
    return getPrisma().tag.findMany();
  };

  it('can tag post', async () => {
    const post = await createPost();
    const tags = await createTags();

    await getPrisma().post.update({
      where: {id: post.id},
      data: {tags: {connect: tags.map(({id}) => ({id}))}},
    });

    const findPostWithTag = async () =>
      await getPrisma().post.findFirst({include: {tags: true}});

    expect((await findPostWithTag())?.tags?.length).toEqual(tags.length);

    await getPrisma().post.update({
      where: {id: post.id},
      data: {tags: {disconnect: {id: tags[0]?.id}}},
    });
    expect((await findPostWithTag())?.tags?.length).toEqual(tags.length - 1);
  });
});
