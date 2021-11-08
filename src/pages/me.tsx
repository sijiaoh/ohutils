import {Breadcrumb} from 'src/components/BreadcrumbListComponent';
import {toCsrPage} from 'src/utils/toCsrPage';

export const meTitle = 'Me';
export const mePath = '/me';
export const meBreadcrumb: Breadcrumb = {title: meTitle, path: mePath};

export default toCsrPage(import('src/components/MeComponent'), {
  requireAuth: true,
});
