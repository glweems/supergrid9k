import "normalize-css";
import React from "react";
import ReactDOM from "react-dom";
import { ErrorBoundary } from "react-error-boundary";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import App from "./App";
import ErrorFallback from "./components/ErrorFallback";
import "./index.css";
import theme from "./lib/theme";
import * as serviceWorker from "./serviceWorker";

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
    <App />
  </ContextProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
