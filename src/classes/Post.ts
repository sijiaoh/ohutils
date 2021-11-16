import {ReactiveClass} from '@reactive-class/react';
import {produce} from 'immer';
import {pick} from 'underscore';
import {apolloSdk, PostInputType, PostType} from 'src/apollo';

export class Post extends ReactiveClass {
  input: Readonly<PostInputType> = {
    title: '',
    text: '',
    tags: [],
    copyProtect: true,
  };
  data?: Readonly<PostType>;
  loaded = false;

  constructor(public id?: string) {
    super();
  }

  load = async () => {
    if (!this.id) return;
    this.loaded = false;

    const {
      data: {post},
    } = await apolloSdk.postQuery({variables: {id: this.id}});
    this.setData(post);
    this.setInput(post);

    this.loaded = true;
  };

  setInput = (input: Partial<PostInputType>) => {
    this.input = produce(this.input, draft => ({...draft, ...input}));
  };

  setTagsFromStr = (str: string) => {
    this.setInput({
      tags: str
        .replace(/\s+/g, ' ')
        .split(' ')
        .filter(tag => !!tag),
    });
  };

  save = async () => {
    // this.inputには余分なデータが入っている可能性がある。
    const postVariable: PostInputType = pick(
      this.input,
      'title',
      'text',
      'tags',
      'copyProtect'
    );

    if (this.id == null) {
      const {data} = await apolloSdk.createPostMutation({
        variables: {
          post: postVariable,
        },
      });
      if (data) this.setData(data.createPost);
    } else {
      const {data} = await apolloSdk.updatePostMutation({
        variables: {
          id: this.id,
          post: postVariable,
        },
      });
      if (data) this.setData(data.updatePost);
    }
    this.id = this.data?.id;
  };

  remove = async () => {
    if (!this.id) return;
    await apolloSdk.removePostMutation({variables: {id: this.id}});
    this.data = undefined;
    this.id = undefined;
  };

  private setData = (data: PostType) => {
    this.data = produce(this.data, () => data);
  };
}
