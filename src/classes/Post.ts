import {ReactiveClass} from '@reactive-class/react';
import {apolloSdk} from 'src/apollo';
import {EntityNotFoundError} from 'src/graphql/EntityNotFoundError';

export class Post extends ReactiveClass {
  async load(id: string) {
    const {data, error, errors} = await apolloSdk.postQuery({variables: {id}});
    if (error || errors) throw new EntityNotFoundError();
    return new Post(data.post.title, data.post.text, data.post.tags);
  }

  constructor(public title = '', public text = '', public tags: string[] = []) {
    super();
  }

  setTagsFromStr = (str: string) => {
    this.tags = str
      .replace(/\s+/g, ' ')
      .split(' ')
      .filter(tag => !!tag);
  };

  save = async () => {
    await apolloSdk.createPostMutation({
      variables: {
        post: {
          text: this.text,
          title: this.title,
          tags: this.tags,
        },
      },
    });
  };
}
