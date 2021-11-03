import {DefaultProps} from 'src/utils/DefaultProps';
import {Link} from 'src/utils/Link';

export interface BreadcrumbListItem {
  title: string;
  path?: string;
}

export const BreadcrumbComponent = ({
  className,
  list: breadcrumbList,
  separator = '>',
}: DefaultProps<{
  list: BreadcrumbListItem[];
  separator?: string;
}>) => {
  return (
    <ul
      className={className}
      css={{
        display: 'flex',
        flexWrap: 'wrap',
        overflow: 'hidden',
      }}
    >
      {breadcrumbList.map((item, index) => (
        <li
          key={index}
          css={{
            maxWidth: '10em',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',

            ':first-child:before': {
              content: '""',
              margin: '0',
            },
            ':before': {
              content: `"${separator}"`,
              margin: '0 0.5em',
            },
          }}
        >
          {item.path ? <Link href={item.path}>{item.title}</Link> : item.title}
        </li>
      ))}
    </ul>
  );
};
