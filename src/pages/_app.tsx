import App, { Container } from 'next/app';
import Head from 'next/head';
import React from 'react';

export default class MyApp extends App {
  public static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  public render() {
    const { Component, pageProps } = (this as any).props;

    return (
      <Container>
        <div>
          <Head>
            <title>{'Fast App Template'}</title>
          </Head>
          <Component {...pageProps} />
        </div>
      </Container>
    );
  }
}
