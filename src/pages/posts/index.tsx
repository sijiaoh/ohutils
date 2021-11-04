import {Breadcrumb} from 'src/components/BreadcrumbListComponent';
import {PostsComponent} from 'src/components/posts/PostsComponent';
import {toCsrPage} from 'src/utils/toCsrPage';

export const postsTitle = '投稿一覧';
export const postsPath = '/posts';
export const postsBreadcrumb: Breadcrumb = {title: postsTitle, path: postsPath};

export default toCsrPage(PostsComponent);
