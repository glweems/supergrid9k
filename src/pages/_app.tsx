// _app.js
import App, { AppContext, AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import ContextProvider from "../components/ContextProvider";
import GlobalStyle from "../lib/GlobalStyle";

export default class MyApp extends App<AppProps> {
  static async getInitialProps({ Component, router, ctx }: AppContext) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <React.Fragment>
        <Head>
          <title>Super Grid 9K</title>
        </Head>
        <ContextProvider>
          <GlobalStyle />
          <Component {...pageProps} />
        </ContextProvider>
      </React.Fragment>
    );
  }
}
