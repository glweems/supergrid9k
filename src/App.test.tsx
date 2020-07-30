import { render } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import App from "./App";
import theme from "./lib/theme";

test("renders gridTemplateRows", () => {
  const { getByText } = render(
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </RecoilRoot>
  );
  const gridTemplateRows = getByText(/Grid Template Rows/i);
  expect(gridTemplateRows).toBeInTheDocument();
});

test("renders gridTemplateColumns", () => {
  const { getByText } = render(
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </RecoilRoot>
  );
  const gridTemplateColumns = getByText(/Grid Template Rows/i);
  expect(gridTemplateColumns).toBeInTheDocument();
});
