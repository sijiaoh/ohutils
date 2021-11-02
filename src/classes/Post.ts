import {ReactiveClass} from '@reactive-class/react';
import {produce} from 'immer';
import {apolloSdk, PostInput, PostType} from 'src/apollo';

export type PostData = Omit<PostType, 'id'>;

export class Post extends ReactiveClass {
  data?: Readonly<PostData> | null;

  constructor(public id?: string) {
    super();
  }

  load = async () => {
    if (!this.id) return;

    this.data = await apolloSdk
      .postQuery({variables: {id: this.id}})
      .then(({data}) => data.post)
      .catch(() => null);
  };

  setData = (data: Partial<PostData>) => {
    this.data = this.data || {title: '', text: '', tags: []};
    this.data = produce(this.data, draft => {
      return {
        ...draft,
        ...data,
      };
    });
  };

  setTagsFromStr = (str: string) => {
    if (!this.data) return;

    this.data = produce(this.data, data => {
      data.tags = str
        .replace(/\s+/g, ' ')
        .split(' ')
        .filter(tag => !!tag);
    });
  };

  save = async () => {
    if (!this.data) return;

    const postVariable: PostInput = {
      title: this.data.title,
      text: this.data.text,
      tags: this.data.tags,
    };

    if (this.id == null) {
      this.id = await apolloSdk
        .createPostMutation({
          variables: {
            post: postVariable,
          },
        })
        .then(({data}) => data?.createPost.id);
    } else {
      await apolloSdk.updatePostMutation({
        variables: {
          id: this.id,
          post: postVariable,
        },
      });
    }
  };
}
