import { render } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import App from "./App";

test("renders gridTemplateRows", () => {
  const { getByText } = render(
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
  const gridTemplateRows = getByText(/Grid Template Rows/i);
  expect(gridTemplateRows).toBeInTheDocument();
});

test("renders gridTemplateColumns", () => {
  const { getByText } = render(
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
  const gridTemplateColumns = getByText(/Grid Template Rows/i);
  expect(gridTemplateColumns).toBeInTheDocument();
});
