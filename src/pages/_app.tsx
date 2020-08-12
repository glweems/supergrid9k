// _app.js
import App, { AppContext, AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import ContextProvider from "../components/ContextProvider";
import ErrorFallback from "../components/ErrorFallback";
import GlobalStyle from "../lib/GlobalStyle";
import setCssVariables from "../lib/setCssVariables";
import { colors } from "../lib/theme";

setCssVariables(colors);
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
          <ErrorBoundary fallbackRender={ErrorFallback}>
            <Component {...pageProps} />
          </ErrorBoundary>
        </ContextProvider>
      </React.Fragment>
    );
  }
}
