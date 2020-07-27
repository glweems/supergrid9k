import React from "react";
import GridEditorInputs from "./GridEditorInputs";
import GridEntries from "./GridEntries";

const GridEditor: React.FC = () => (
  <React.Fragment>
    <GridEditorInputs />
    <GridEntries />
  </React.Fragment>
);

export default GridEditor;
