import { render } from "@testing-library/react";
import React from "react";
import ContextProvider from "./components/ContextProvider";
import GridEditorControls, {
  GridTemplateControls,
} from "./components/GridEditor/GridEditorControls";
import { useGridTemplate } from "./state";
import { renderHook, act } from "@testing-library/react-hooks";

test("renders Grid Rows", () => {
  const gridTemplateRows = renderHook(() =>
    useGridTemplate("gridTemplateRows")
  );

  expect(gridTemplateRows).toBeDefined();
});

test("renders Grid Columns", () => {
  // eslint-disable
  const rowData = useGridTemplate("gridTemplateRows", "Grid Rows");
  const { getByText } = render(
    <ContextProvider>
      <GridTemplateControls {...rowData} />
    </ContextProvider>
  );
  const gridTemplateColumns = getByText(/Grid Columns/i);
  expect(rowData.name).toBeDefined();
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
