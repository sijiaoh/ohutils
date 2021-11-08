import {toCsrPage} from 'src/utils/toCsrPage';

export default toCsrPage(import('src/components/votes/VotesCreateComponent'), {
  requireAuth: true,
});
