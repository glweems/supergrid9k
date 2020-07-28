import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/bootstrap-icons.svg";
import App from "./App";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import theme from "./lib/theme";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallback";
import GlobalCss from "./lib/GlobalCss";

export const ContextProvider: React.FC = ({ children }) => {
  return (
    <ErrorBoundary fallbackRender={ErrorFallback}>
      <ThemeProvider theme={theme}>
        <RecoilRoot>{children}</RecoilRoot>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

ReactDOM.render(
  <ContextProvider>
    <GlobalCss />
    <App />
  </ContextProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
