import type {Breadcrumb} from 'src/components/BreadcrumbListComponent';

export const homeTitle = 'Home';
export const homePath = '/';
export const homeBreadcrumb: Breadcrumb = {title: homeTitle, path: homePath};

export const signInTitle = 'ログイン';
export const signInPath = '/signin';
export const signInBreadcrumb: Breadcrumb = {
  title: signInTitle,
  path: signInPath,
};

export const meTitle = 'Me';
export const mePath = '/me';
export const meBreadcrumb: Breadcrumb = {title: meTitle, path: mePath};

export const postsTitle = '投稿一覧';
export const postsPath = '/posts';
export const postsBreadcrumb: Breadcrumb = {title: postsTitle, path: postsPath};

export const postTitle = (title: string) => title;
export const postPath = (id: string) => `/post/${id}`;
export const postBreadcrumb: ({
  id,
  title,
}: {
  id: string;
  title: string;
}) => Breadcrumb = ({id, title}) => ({
  title: postTitle(title),
  path: postPath(id),
});

export const postsCreateTitle = '投稿作成';
export const postsCreatePath = '/posts/create';
export const postsCreateBreadcrumb: Breadcrumb = {
  title: postsCreateTitle,
  path: postsCreatePath,
};

export const postsEditTitle = '投稿編集';
export const postsEditPath = (id: string) => `/posts/edit/${id}`;
export const postsEditBreadcrumb: (id: string) => Breadcrumb = id => ({
  title: postsEditTitle,
  path: postsEditPath(id),
});

export const votesTitle = '投票一覧';
export const votesPath = '/votes';
export const votesBreadcrumb: Breadcrumb = {title: votesTitle, path: votesPath};

export const voteTitle = (title: string) => title;
export const votePath = (id: string) => `/vote/${id}`;
export const voteBreadcrumb: ({
  id,
  title,
}: {
  id: string;
  title: string;
}) => Breadcrumb = ({id, title}) => ({
  title: voteTitle(title),
  path: votePath(id),
});

export const votesCreateTitle = '投票作成';
export const votesCreatePath = '/votes/create';
export const votesCreateBreadcrumb: Breadcrumb = {
  title: votesCreateTitle,
  path: votesCreatePath,
};
