import {Breadcrumb} from 'src/components/BreadcrumbListComponent';
import {VotesCreateComponent} from 'src/components/votes/VotesCreateComponent';
import {withAuth} from 'src/hocs/withAuth';
import {toCsrPage} from 'src/utils/toCsrPage';

export const votesCreateTitle = '投票作成';
export const votesCreatePath = '/votes/create';
export const votesCreateBreadcrumb: Breadcrumb = {
  title: votesCreateTitle,
  path: votesCreatePath,
};

export default toCsrPage(withAuth(VotesCreateComponent));
