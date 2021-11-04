import {Breadcrumb} from 'src/components/BreadcrumbListComponent';
import {MeComponent} from 'src/components/MeComponent';
import {withAuth} from 'src/hocs/withAuth';
import {toCsrPage} from 'src/utils/toCsrPage';

export const meTitle = 'Me';
export const mePath = '/me';
export const meBreadcrumb: Breadcrumb = {title: meTitle, path: mePath};

export default toCsrPage(withAuth(MeComponent));
