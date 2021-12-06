import {toCsrPage} from 'src/utils/toCsrPage';

export default toCsrPage(import('src/components/posts/PostCreateComponent'), {
  requireAuth: true,
});
