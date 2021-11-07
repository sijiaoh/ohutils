import {Breadcrumb} from 'src/components/BreadcrumbListComponent';
import {VotesComponent} from 'src/components/votes/VotesComponent';
import {toCsrPage} from 'src/utils/toCsrPage';

export const votesTitle = '投票一覧';
export const votesPath = '/votes';
export const votesBreadcrumb: Breadcrumb = {title: votesTitle, path: votesPath};

export default toCsrPage(VotesComponent);
