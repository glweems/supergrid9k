import Document, { DocumentContext, DocumentProps } from "next/document";
import React from "react";
import { GoogleFont, TypographyStyle } from "react-typography";
import { ServerStyleSheet } from "styled-components/macro";
import typography from "../lib/typography";

interface MyDocumentProps extends DocumentProps {
  styleTags: string;
}

export default class MyDocument extends Document<MyDocumentProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
            <TypographyStyle typography={typography} />
            <GoogleFont typography={typography} />
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
}
