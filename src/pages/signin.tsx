import {Breadcrumb} from 'src/components/BreadcrumbListComponent';
import {SignInComponent} from 'src/components/SignInComponent';
import {withNotAuth} from 'src/hocs/withNotAuth';
import {toCsrPage} from 'src/utils/toCsrPage';

export const signInTitle = 'ログイン';
export const signInPath = '/signin';
export const signInBreadcrumb: Breadcrumb = {
  title: signInTitle,
  path: signInPath,
};

export default toCsrPage(withNotAuth(SignInComponent));
