import React from "react";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components/macro";
import GridConfigSubscription from "../lib/GridConfigSubscription";
import theme from "../lib/theme";

const ContextProvider: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <GridConfigSubscription />
        {children}
      </RecoilRoot>
    </ThemeProvider>
  );
};

export default ContextProvider;
