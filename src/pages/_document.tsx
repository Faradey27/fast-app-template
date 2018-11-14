import Document, { Head, Main, NextScript } from 'next/document';
import Noscript from '../components/Noscript';

class MyDocument extends Document {
  public static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  public render() {
    return (
      <html lang="en">
        <Head>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta charSet="utf-8" />
          <meta name="description" content="Template for very fast React application" />
          <meta name="theme-color" content="#000000" />
          <meta name="apple-mobile-web-app-title" content="Fast App Template" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="mobile-web-app-capable" content="yes" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="manifest" href="/manifest.json" />
          <style>{`body { margin: 0 }`}</style>
        </Head>
        <body>
          <Noscript>
            <h2>You need to enable JavaScript to run this app.</h2>
          </Noscript>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
