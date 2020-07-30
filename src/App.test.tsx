import { render } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import GridEditor from "./components/GridEditor/GridEditor";
import theme from "./lib/theme";

test("renders gridTemplateRows", () => {
  const { getByText } = render(
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <GridEditor />
      </RecoilRoot>
    </ThemeProvider>
  );
  const gridTemplateRows = getByText(/Grid Template Rows/i);
  expect(gridTemplateRows).toBeInTheDocument();
});

test("renders gridTemplateColumns", () => {
  const { getByText } = render(
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <GridEditor />
      </RecoilRoot>
    </ThemeProvider>
  );
  const gridTemplateColumns = getByText(/Grid Template Rows/i);
  expect(gridTemplateColumns).toBeInTheDocument();
});
