import React from "react";
import GridEditor from "../components/GridEditor/GridEditor";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import theme from "../lib/theme";
import GlobalStyle from "../lib/GlobalStyle";

export default function IndexPage() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <GridEditor />
      </ThemeProvider>
    </RecoilRoot>
  );
}
