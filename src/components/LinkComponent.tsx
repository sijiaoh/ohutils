import NextLink, {LinkProps} from 'next/link';
import type {PropsWithChildren} from 'react';

export const LinkComponent = (props: PropsWithChildren<LinkProps>) => (
  <NextLink {...props} passHref />
);
