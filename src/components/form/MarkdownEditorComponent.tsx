import {MarkdownComponent} from '../MarkdownComponent';
import {FieldComponent} from '.';
import {DefaultProps} from 'src/utils/DefaultProps';

export const MarkdownEditorComponent = ({
  className,
  id,
  name,
  label,
  text,
}: DefaultProps<{
  id: string;
  name: string;
  label: string;
  text: string;
}>) => {
  return (
    <div
      className={className}
      css={{width: '100%', height: '100%', display: 'flex'}}
    >
      <FieldComponent
        id={id}
        name={name}
        label={label}
        as="textarea"
        css={{width: '50%'}}
        fieldCss={{flex: 1}}
      />
      <MarkdownComponent
        text={text}
        css={{
          width: '50%',
          height: '100%',
          overflow: 'auto',
          border: 'solid 1px lightgray',
          padding: '1em',
        }}
      />
    </div>
  );
};
