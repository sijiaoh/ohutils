import hljs from 'highlight.js';
import markdownToHtml from 'marked';
import {useEffect, useRef} from 'react';
import {DefaultProps} from 'src/utils/DefaultProps';

import 'highlight.js/styles/vs2015.css';

export const MarkdownComponent = ({
  text,
  className,
}: DefaultProps<{text: string}>) => {
  const elmRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elm = elmRef.current;
    if (!elm) return;
    elm.innerHTML = markdownToHtml(text, {
      langPrefix: 'hljs ',
      highlight: (code, lang) => {
        if (hljs.getLanguage(lang))
          return hljs.highlight(code, {language: lang}).value;
        return code;
      },
    });
  }, [text]);

  return (
    <div
      className={className}
      css={{
        userSelect: 'none',
      }}
    >
      <div ref={elmRef} />
    </div>
  );
};
