// _app.js
import { colors, space } from '@/lib/theme';
import App, { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { RecoilRoot } from 'recoil';
import ContextProvider from '../components/ContextProvider';
import { setCssArrayVariables, setCssObjectVariables } from '../lib/setCssVariables';

class MyApp extends App<AppProps<{ dehydratedState: any }>> {
  static async getInitialProps({ Component, ctx }: AppContext) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    setCssObjectVariables(colors, 'color');
    setCssArrayVariables(
      space.map((val) => `${val}px`),
      'space'
    );
    const { Component, pageProps } = this.props;
    return (
      <React.Fragment>
        <Head>
          <title>Super Grid 9K</title>
        </Head>

        <RecoilRoot>
          <ContextProvider>
            <Component {...pageProps} />
          </ContextProvider>
        </RecoilRoot>
      </React.Fragment>
    );
  }
}
export default MyApp;
