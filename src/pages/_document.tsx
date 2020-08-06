import {
  DocumentContext,
  DocumentProps,
} from "next/dist/next-server/lib/utils";
import Document, { Head, Main, NextScript } from "next/document";
import React from "react";
import { ServerStyleSheet } from "styled-components/macro";

interface MyDocumentProps extends DocumentProps {
  styleTags: string;
}
export default class MyDocument extends Document<MyDocumentProps> {
  static async getStaticProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      // wraps the collectStyles provider around our <App />.
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      // extract the initial props that may be present.
      const initialProps = await Document.getInitialProps(ctx);

      // returning the original props together with our styled components.
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <html lang="en">
        <Head>
          {this.props.styleTags /* rendering the actually stylesheet */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
