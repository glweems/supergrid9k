import React from "react";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "../lib/GlobalStyle";
import theme from "../lib/theme";

const ContextProvider: React.FC = ({ children }) => {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </RecoilRoot>
  );
};

export default ContextProvider;
