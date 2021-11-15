import {LinkComponent} from 'src/components/LinkComponent';
import type {DefaultProps} from 'src/utils/DefaultProps';

export interface Breadcrumb {
  title: string;
  path?: string;
}

export const BreadcrumbListComponent = ({
  className,
  list,
  separator = '>',
}: DefaultProps<{
  list: Breadcrumb[];
  separator?: string;
}>) => {
  return (
    <ul
      className={className}
      css={{
        display: 'flex',
        flexWrap: 'wrap',
        overflow: 'hidden',
        margin: 0,
        padding: 0,
      }}
    >
      {list.map((item, index) => (
        <li
          key={index}
          css={{
            maxWidth: '10em',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',

            ':first-of-type:before': {
              content: '""',
              margin: '0',
            },
            ':before': {
              content: `"${separator}"`,
              margin: '0 0.5em',
            },
          }}
        >
          {item.path ? (
            <LinkComponent href={item.path}>{item.title}</LinkComponent>
          ) : (
            item.title
          )}
        </li>
      ))}
    </ul>
  );
};
