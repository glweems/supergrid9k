// import {
//   DocumentContext,
//   DocumentProps,
// } from "next/dist/next-server/lib/utils";
// import Document, { Main, NextScript } from "next/document";
// import React from "react";
// import { ServerStyleSheet } from "styled-components/macro";
// import SEO from "../components/SEO";
// import { TypographyStyle, GoogleFont } from "react-typography";
// import typography from "../lib/typography";
// export default class MyDocument extends Document<MyDocumentProps> {
//   static async getStaticProps(ctx: DocumentContext) {
//     const sheet = new ServerStyleSheet();
//     const originalRenderPage = ctx.renderPage;

//     try {
//       // wraps the collectStyles provider around our <App />.
//       ctx.renderPage = () =>
//         originalRenderPage({
//           enhanceApp: (App) => (props) =>
//             sheet.collectStyles(<App {...props} />),
//         });

//       // extract the initial props that may be present.
//       const initialProps = await Document.getInitialProps(ctx);

//       // returning the original props together with our styled components.
//       return {
//         ...initialProps,
//         styles: (
//           <>
//             {initialProps.styles}
//             {sheet.getStyleElement()}
//           </>
//         ),
//       };
//     } finally {
//       sheet.seal();
//     }
//   }

//   render() {
//     return (
//       <html lang="en">
//         <SEO>
//           {this.props.styleTags /* rendering the actually stylesheet */}
//           <TypographyStyle typography={typography} />
//           <GoogleFont typography={typography} />
//         </SEO>
//         <body>
//           <Main />
//           <NextScript />
//           <script async defer src="https://buttons.github.io/buttons.js" />
//         </body>
//       </html>
//     );
//   }
// }
import React from "react";
import Document, { DocumentProps, DocumentContext } from "next/document";
import { ServerStyleSheet } from "styled-components";
import { GoogleFont, TypographyStyle } from "react-typography";
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
        headTags: [
          <script async defer src="https://buttons.github.io/buttons.js" />,
        ],
      };
    } finally {
      sheet.seal();
    }
  }
}
