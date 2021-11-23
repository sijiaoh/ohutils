import {css, Global} from '@emotion/react';
import Document, {Html, Head, Main, NextScript} from 'next/document';

class MyDocument extends Document {
  override render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Kosugi&family=Noto+Sans+JP&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Global
            styles={css({
              '*': {
                fontFamily: "'Noto Sans JP', sans-serif",
              },
              'code *': {
                fontFamily: "'Kosugi', sans-serif",
              },
            })}
          />

          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
