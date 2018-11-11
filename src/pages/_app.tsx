import React from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head'

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render () {
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
    )
  }
}
