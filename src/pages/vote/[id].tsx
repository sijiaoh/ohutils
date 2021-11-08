import {Breadcrumb} from 'src/components/BreadcrumbListComponent';
import {toCsrPage} from 'src/utils/toCsrPage';

export const voteTitle = (title: string) => title;
export const votePath = (id: string) => `/vote/${id}`;
export const voteBreadcrumb: ({
  id,
  title,
}: {
  id: string;
  title: string;
}) => Breadcrumb = ({id, title}) => ({
  title: voteTitle(title),
  path: votePath(id),
});

export default toCsrPage(import('src/components/votes/VoteComponent'));
