import {Breadcrumb} from 'src/components/BreadcrumbListComponent';
import {PostComponent} from 'src/components/posts/PostComponent';
import {toCsrPage} from 'src/utils/toCsrPage';

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

export default toCsrPage(PostComponent);
