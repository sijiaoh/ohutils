import {Breadcrumb} from 'src/components/BreadcrumbListComponent';
import {toCsrPage} from 'src/utils/toCsrPage';

export const signInTitle = 'ログイン';
export const signInPath = '/signin';
export const signInBreadcrumb: Breadcrumb = {
  title: signInTitle,
  path: signInPath,
};

export default toCsrPage(import('src/components/SignInComponent'), {
  requireAuth: false,
});
