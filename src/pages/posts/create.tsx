import {Breadcrumb} from 'src/components/BreadcrumbListComponent';
import {PostsCreateComponent} from 'src/components/posts/PostsCreateComponent';
import {withAuth} from 'src/hocs/withAuth';
import {toCsrPage} from 'src/utils/toCsrPage';

export const postsCreateTitle = '投稿作成';
export const postsCreatePath = '/posts/create';
export const postsCreateBreadcrumb: Breadcrumb = {
  title: postsCreateTitle,
  path: postsCreatePath,
};

export default toCsrPage(withAuth(PostsCreateComponent));
