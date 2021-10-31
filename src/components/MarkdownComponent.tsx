import hljs from 'highlight.js';
import marked from 'marked';
import {useEffect, useRef} from 'react';
import {DefaultProps} from 'src/utils/DefaultProps';

import 'highlight.js/styles/github.css';

export const MarkdownComponent = ({
  text,
  className,
}: DefaultProps<{text: string}>) => {
  const elmRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elm = elmRef.current;
    if (!elm) return;
    elm.innerHTML = marked(text, {
      highlight: (code, lang) => {
        if (hljs.getLanguage(lang))
          return hljs.highlight(code, {language: lang}).value;
        return code;
      },
    });
  }, [text]);

  return (
    <div className={className} css={{padding: '1em'}}>
      <div ref={elmRef} />
    </div>
  );
};
