import type {Breadcrumb} from 'src/components/BreadcrumbListComponent';

export const homeTitle = 'Home';
export const homePath = '/';
export const homeBreadcrumb: Breadcrumb = {title: homeTitle, path: homePath};

export const signInTitle = 'ログイン';
export const signInPath = '/signin';
export const signInBreadcrumb: Breadcrumb = {
  title: signInTitle,
  path: signInPath,
};

export const meTitle = 'Me';
export const mePath = '/me';
export const meBreadcrumb: Breadcrumb = {title: meTitle, path: mePath};
