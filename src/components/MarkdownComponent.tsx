import hljs from 'highlight.js/lib/core';
import cpp from 'highlight.js/lib/languages/cpp';
import marked from 'marked';
import mermaid from 'mermaid';
import {useEffect, useRef} from 'react';
import type {DefaultProps} from 'src/utils/DefaultProps';

import 'highlight.js/styles/github-dark.css';

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
      highlight: (code, lang) => {
        if (hljs.getLanguage(lang))
          return [
            '<div class="hljs">',
            hljs.highlight(code, {language: lang}).value,
            '</div>',
          ].join('');
        if (lang === 'mermaid')
          return ['<div class="mermaid">', code, '</div>'].join('');
        return code;
      },
    });
    mermaid.init('.mermaid');
  }, [text]);

  return (
    <div className={className}>
      <div ref={elmRef} />
    </div>
  );
};
