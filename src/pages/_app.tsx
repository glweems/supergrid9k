// _app.js
import App, { AppContext, AppProps, Container } from "next/app";
import dynamic from "next/dynamic";
import React from "react";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "../lib/GlobalStyle";
import theme from "../lib/theme";

dynamic(() => import("normalize-css/normalize.css" as any));

export default class MyApp extends App<AppProps> {
  static async origGetInitialProps({ Component, router, ctx }: AppContext) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <RecoilRoot>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Component {...pageProps} />
          </ThemeProvider>
        </RecoilRoot>
      </Container>
    );
  }
}
