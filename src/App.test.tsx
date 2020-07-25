import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { RecoilRoot } from "recoil";

test("renders learn react link", () => {
  const { getByText } = render(
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
  const linkElement = getByText(/SuperGrid9k/i);
  expect(linkElement).toBeInTheDocument();
});
