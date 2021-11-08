import {BreadcrumbListComponent} from './BreadcrumbListComponent';
import {HeadComponent} from './HeadComponent';
import {OauthLinksComponent} from './OauthLinksComponent';
import {homeBreadcrumb, signInTitle} from 'src/utils/pageHelpers';

export const SignInComponent = () => {
  return (
    <div>
      <HeadComponent subTitle={signInTitle} />

      <BreadcrumbListComponent list={[homeBreadcrumb, {title: signInTitle}]} />

      <OauthLinksComponent postfix="ログイン" />
    </div>
  );
};
