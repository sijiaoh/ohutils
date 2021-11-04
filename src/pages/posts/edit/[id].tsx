import {Breadcrumb} from 'src/components/BreadcrumbListComponent';
import {PostsEditComponent} from 'src/components/posts/PostsEditComponent';
import {withAuth} from 'src/hocs/withAuth';
import {toCsrPage} from 'src/utils/toCsrPage';

export const postsEditTitle = '投稿編集';
export const postsEditPath = (id: string) => `/posts/edit/${id}`;
export const postsEditBreadcrumb: (id: string) => Breadcrumb = id => ({
  title: postsEditTitle,
  path: postsEditPath(id),
});

export default toCsrPage(withAuth(PostsEditComponent));
