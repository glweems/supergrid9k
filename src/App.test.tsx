import { render } from "@testing-library/react";
import React from "react";
import ContextProvider from "./components/ContextProvider";
import GridEditorControls from "./components/GridEditor/GridEditorControls";
test("renders Grid Rows", () => {
  const { getByText } = render(
    <ContextProvider>
      <GridEditorControls />
    </ContextProvider>
  );
  const gridTemplateRows = getByText(/Grid Rows/i);

  expect(gridTemplateRows).toBeDefined();
});

test("renders Grid Columns", () => {
  const { getByText } = render(
    <ContextProvider>
      <GridEditorControls />
    </ContextProvider>
  );
  const gridTemplateColumns = getByText(/Grid Columns/i);
  expect(gridTemplateColumns).toBeDefined();
});

test("renders Grid Gap", () => {
  const { getByText } = render(
    <ContextProvider>
      <GridEditorControls />
    </ContextProvider>
  );
  const gridTemplateColumns = getByText(/Grid Gap/i);
  expect(gridTemplateColumns).toBeDefined();
});
