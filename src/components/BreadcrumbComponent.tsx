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
      }}
    >
      {breadcrumbList.map((item, index) => (
        <li
          key={index}
          css={{
            whiteSpace: 'nowrap',

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
