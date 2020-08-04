import { render } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import GridEditor from "./components/GridEditor/GridEditor";
import theme from "./lib/theme";
beforeAll((js) => (
  <ThemeProvider theme={theme}>
    <RecoilRoot>{js()}</RecoilRoot>
  </ThemeProvider>
));

test("renders Grid Rows", () => {
  const { getByText } = render(
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <GridEditor />
      </RecoilRoot>
    </ThemeProvider>
  );
  const gridTemplateRows = getByText(/Grid Rows/i);
  expect(gridTemplateRows).toBeInTheDocument();
});

test("renders Grid Columns", () => {
  const { getByText } = render(
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <GridEditor />
      </RecoilRoot>
    </ThemeProvider>
  );
  const gridTemplateColumns = getByText(/Grid Columns/i);
  expect(gridTemplateColumns).toBeInTheDocument();
});

test("renders Grid Gap", () => {
  const { getByText } = render(
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <GridEditor />
      </RecoilRoot>
    </ThemeProvider>
  );
  const gridTemplateColumns = getByText(/Grid Gap/i);
  expect(gridTemplateColumns).toBeInTheDocument();
});
