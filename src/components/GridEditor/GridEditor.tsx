import React from "react";
import styled from "styled-components";
import Box from "../../ui/Box";
import CodeViewer from "../CodeViewer";
import GridEditorInputs from "./GridEditorInputs";
import GridEntries from "./GridEntries";

const GridEditor: React.FC = () => {
  return (
    <Layout>
      <Box as="aside" className="grid-controls">
        <GridEditorInputs />
      </Box>

      <Box className="grid-entries">
        <GridEntries height="100%" />
      </Box>

      <div className="code-viewer">
        <CodeViewer />
      </div>
    </Layout>
  );
};

const Layout = styled(Box)`
  display: grid;
  grid-template-areas:
    "grid-controls grid-entries grid-entries grid-entries"
    "grid-controls grid-entries grid-entries grid-entries"
    "grid-controls code-viewer code-viewer code-viewer";
  grid-template-rows: repeat(3, 33vh);
  grid-template-columns: repeat(4, 1fr);
  gap: 1px 1px;
  height: 100vh;

  .grid-controls {
    grid-area: grid-controls;
    height: 100vh;
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
