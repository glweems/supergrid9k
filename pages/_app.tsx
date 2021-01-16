// _app.js
import ContextProvider from '@components/ContextProvider';
import { analytics, initGA } from '@lib/analytics';
// import { initGA } from '@lib/analytics';
import { colors } from '@lib/theme';
import App, { AppContext, AppProps } from 'next/app';
import React from 'react';
import Helmet from 'react-helmet';
import { RecoilRoot } from 'recoil';

/* Using react-helmet onChangeClientState */
let previousTitle;
const handlePageView = (newState) => {
  if (previousTitle !== newState.title) {
    console.log(`react-helmet onChangeClientState "${newState.title}"`);
    // Run page view!
    analytics.page({ title: newState.title }, () => {
      console.log('Page callback from CustomHelmet');
    });
    // set previousTitle
    previousTitle = newState.title;
  }
};

class MyApp extends App<AppProps<{ dehydratedState: any }>> {
  static async getInitialProps({ Component, ctx }: AppContext) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  componentDidMount() {
    console.log('hi');
  }

  render() {
    initGA();
    // guestersEventListeners();
    // setCssObjectVariables(colors, 'color');
    // setCssArrayVariables(
    //   space.map((val) => `${val}px`),
    //   'space'
    // );
    const { Component, pageProps } = this.props;
    return (
      <React.Fragment>
        <Helmet onChangeClientState={handlePageView}>
          <title>Super Grid 9K</title>
          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="/apple-icon-57x57.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="/apple-icon-60x60.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="/apple-icon-72x72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/apple-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="/apple-icon-114x114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="/apple-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/apple-icon-144x144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/apple-icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-icon-180x180.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/android-icon-192x192.png"
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
            sizes="96x96"
            href="/favicon-96x96.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <meta name="msapplication-TileColor" content={colors.focus} />
          <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
          <meta name="theme-color" content={colors.focus} />
        </Helmet>

        <ContextProvider>
          <RecoilRoot>
            <Component {...pageProps} />
          </RecoilRoot>
        </ContextProvider>
      </React.Fragment>
    );
  }
}
export default MyApp;
