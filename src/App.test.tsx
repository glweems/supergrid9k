import { render } from "@testing-library/react";
import React from "react";
import ContextProvider from "./components/ContextProvider";
import GridEditor from "./components/GridEditor/GridEditor";
test("renders Grid Rows", () => {
  const { getByText } = render(
    <ContextProvider>
      <GridEditor />
    </ContextProvider>
  );
  const gridTemplateRows = getByText(/Grid Rows/i);

  expect(gridTemplateRows).toBeDefined();
});

test("renders Grid Columns", () => {
  const { getByText } = render(
    <ContextProvider>
      <GridEditor />
    </ContextProvider>
  );
  const gridTemplateColumns = getByText(/Grid Columns/i);
  expect(gridTemplateColumns).toBeDefined();
});

test("renders Grid Gap", () => {
  const { getByText } = render(
    <ContextProvider>
      <GridEditor />
    </ContextProvider>
  );
  const gridTemplateColumns = getByText(/Grid Gap/i);
  expect(gridTemplateColumns).toBeDefined();
});
