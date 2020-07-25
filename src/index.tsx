import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import "./index.css";
import App from "./App";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import theme from "./lib/theme";
import { ErrorBoundary } from "react-error-boundary";

ReactDOM.render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
    <ErrorBoundary fallbackRender={() => <div>whoops</div>}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </ErrorBoundary>
  </ThemeProvider>,
  // </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
