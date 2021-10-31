import marked from 'marked';
import {useEffect, useRef} from 'react';
import {DefaultProps} from 'src/utils/DefaultProps';

export const MarkdownComponent = ({
  text,
  className,
}: DefaultProps<{text: string}>) => {
  const elmRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elm = elmRef.current;
    if (!elm) return;
    elm.innerHTML = marked(text);
  }, [text]);

  return (
    <div className={className} css={{padding: '1em'}}>
      <div ref={elmRef} />
    </div>
  );
};
