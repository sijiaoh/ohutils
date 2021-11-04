import {Breadcrumb} from 'src/components/BreadcrumbListComponent';
import {HomeComponent} from 'src/components/HomeComponent';
import {toCsrPage} from 'src/utils/toCsrPage';

export const homeTitle = 'Home';
export const homePath = '/';
export const homeBreadcrumb: Breadcrumb = {title: homeTitle, path: homePath};

export default toCsrPage(HomeComponent);
