import React from "react";
import styled from "styled-components";
import Box from "../../ui/Box";
import CodeViewer from "../CodeViewer";
import Navigation from "../Navigation";
import GridEditorInputs from "./GridEditorInputs";
import GridEntries from "./GridEntries";

const GridEditor: React.FC = () => {
  return (
    <Styles>
      <Box
        as="aside"
        className="grid-controls"
        bg="light"
        borderRight="2px solid"
        borderColor="blue"
      >
        <Navigation />
        <Box paddingX={2}>
          <GridEditorInputs />
        </Box>
      </Box>

      <Box className="grid-entries">
        <GridEntries height="100%" />
      </Box>

      <div className="code-viewer">
        <CodeViewer />
      </div>
    </Styles>
  );
};

const Styles = styled.main`
  display: grid;
  grid-template-areas:
    "grid-controls grid-entries grid-entries grid-entries"
    "grid-controls grid-entries grid-entries grid-entries"
    "code-viewer code-viewer code-viewer code-viewer";
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 270px repeat(3, 1fr);
  height: 100%;
  .grid-controls {
    grid-area: grid-controls;
  }

  .grid-entries {
    grid-area: grid-entries;
    height: 100%;
  }

  .code-viewer {
    grid-area: code-viewer;
  }
`;

export default GridEditor;
