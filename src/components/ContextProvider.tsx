import React from "react";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components/macro";
import theme from "../lib/theme";

const ContextProvider: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>{children}</RecoilRoot>
    </ThemeProvider>
  );
};

export default ContextProvider;
