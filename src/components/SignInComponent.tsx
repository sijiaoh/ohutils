import {SiGoogle} from 'react-icons/si';
import {Link} from 'src/utils/Link';

export const SignInComponent = () => {
  return (
    <div>
      <Link href="/api/signin/google">
        <a css={{display: 'flex', alignItems: 'center'}}>
          <div css={{padding: '0.2em'}}>
            <SiGoogle />
          </div>
          <div>Google ログイン</div>
        </a>
      </Link>
    </div>
  );
};
