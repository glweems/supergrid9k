// _app.js
import { colors, space } from '@/lib/theme';
import App, { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { RecoilRoot } from 'recoil';
import ContextProvider from '@/components/ContextProvider';
import whyDidYouRender from '@welldone-software/why-did-you-render';

import {
  setCssArrayVariables,
  setCssObjectVariables,
} from '@/lib/setCssVariables';

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  whyDidYouRender(React);
}

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
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
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
