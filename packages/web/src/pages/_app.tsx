// _app.js
import App, { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ContextProvider from '../components/ContextProvider';
import ErrorFallback from '../components/ErrorFallback';
import { setCssArrayVariables, setCssObjectVariables } from '../lib/setCssVariables';
import { colors, space } from '../lib/theme';
import RecoilizeDebugger from 'recoilize';

import * as gridNodes from '../store/grid';
import * as uiNodes from '../store/ui';

setCssObjectVariables(colors, 'color');
setCssArrayVariables(
  space.map((val) => `${val}px`),
  'space'
);

export default class MyApp extends App<AppProps<{ dehydratedState: any }>> {
  static async getInitialProps({ Component, ctx }: AppContext) {
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
          <ErrorBoundary fallbackRender={ErrorFallback}>
            <Component {...pageProps} />
          </ErrorBoundary>
        </ContextProvider>
      </React.Fragment>
    );
  }
}
