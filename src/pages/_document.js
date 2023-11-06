import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html style="font-size: 16px">
      <Head
        lang="en"
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
