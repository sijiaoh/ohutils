import hljs from 'highlight.js/lib/core';
import cpp from 'highlight.js/lib/languages/cpp';
import marked from 'marked';
import {useEffect, useRef} from 'react';
import type {DefaultProps} from 'src/utils/DefaultProps';

import 'highlight.js/styles/vs2015.css';

hljs.registerLanguage('cpp', cpp);

export const MarkdownComponent = ({
  text,
  className,
}: DefaultProps<{text: string}>) => {
  const elmRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elm = elmRef.current;
    if (!elm) return;
    elm.innerHTML = marked(text, {
      breaks: true,
      langPrefix: 'hljs ',
      highlight: (code, lang) => {
        if (hljs.getLanguage(lang))
          return hljs.highlight(code, {language: lang}).value;
        return code;
      },
    });
  }, [text]);

  return (
    <div className={className}>
      <div ref={elmRef} />
    </div>
  );
};
