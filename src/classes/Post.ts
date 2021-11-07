import {ReactiveClass} from '@reactive-class/react';
import {produce} from 'immer';
import {apolloSdk, PostInputType, PostType} from 'src/apollo';

export class Post extends ReactiveClass {
  input: Readonly<PostInputType> = {title: '', text: '', tags: []};
  data?: Readonly<PostType>;

  constructor(public id?: string) {
    super();
  }

  loading = () => this.id != null && this.data == null;

  load = async () => {
    if (!this.id) return;

    const {
      data: {post},
    } = await apolloSdk.postQuery({variables: {id: this.id}});
    this.setData(post);
  };

  setInput = (input: Partial<PostInputType>) => {
    this.input = produce(this.input, draft => ({...draft, ...input}));
    if (!this.data) return;
    this.data = produce(this.data, data => {
      Object.assign(data, this.input);
    });
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
    const postVariable: PostInputType = {
      title: this.input.title,
      text: this.input.text,
      tags: this.input.tags,
    };

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

  private setData = (data: PostType) => {
    this.data = produce(this.data, () => data);
    this.input = produce(this.input, () => data);
  };
}
