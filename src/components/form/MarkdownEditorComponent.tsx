import {useEffect, useRef, useState} from 'react';
import {useFormContext} from 'react-hook-form';
import {debounce} from 'underscore';
import {MarkdownComponent} from '../MarkdownComponent';
import {FieldComponent} from './FieldComponent';
import type {DefaultProps} from 'src/utils/DefaultProps';

export const MarkdownEditorComponent = ({
  className,
  id,
  name,
  label,
}: DefaultProps<{
  id: string;
  name: string;
  label: string;
}>) => {
  const [markdownText, setMarkdownText] = useState('');
  const {getValues} = useFormContext();

  const onChange = useRef(
    debounce((text: string) => {
      setMarkdownText(text);
    }, 500)
  ).current;

  useEffect(() => {
    onChange(getValues(name) as string);
  }, [getValues, name, onChange]);

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
        onChange={text => {
          onChange(text);
        }}
      />
      <MarkdownComponent
        text={markdownText}
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
