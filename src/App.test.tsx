import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { RecoilRoot } from "recoil";

test("renders gridTemplateRows", () => {
  const { getByText } = render(
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
  const gridTemplateRows = getByText(/gridTemplateRows/i);
  expect(gridTemplateRows).toBeInTheDocument();
});
test("renders gridTemplateColumns", () => {
  const { getByText } = render(
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
  const gridTemplateColumns = getByText(/gridTemplateColumns/i);
  expect(gridTemplateColumns).toBeInTheDocument();
});
