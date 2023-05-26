import Document, { Html, Head, Main, NextScript } from 'next/document';
import metatext from '@/data/metatext.json';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="uk">
        <Head>
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <link rel="shortcut icon" href="/favicon/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@300;400;500;600&family=Manrope:wght@600&family=Poiret+One&display=swap"
            rel="stylesheet"
          />
          <meta name="twitter:description" content={metatext.description} />
          <meta name="twitter:title" content={metatext.title} />
          <meta name="twitter:card" content="summary" />
          <meta
            property="og:image"
            content={'/favicon/android-chrome-512x512.png'}
          />
          <meta property="og:type" content="website" />
          <meta property="og:description" content={metatext.description} />
          <meta property="og:title" content={metatext.title} />
          <meta name="description" content={metatext.description} />
          <meta name="generator" content="React 18.2.0" />

          <link
            rel="canonical"
            href="https://github.com/smerch88/Next-TS-Template"
          />
          <link
            rel="alternate"
            href="https://github.com/smerch88/Next-TS-Template"
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
