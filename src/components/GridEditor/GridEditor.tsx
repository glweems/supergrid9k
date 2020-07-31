import React from "react";
import styled from "styled-components";
import Box from "../../ui/Box";
import CodeViewer from "../CodeViewer";
import CodeViewerControls from "../CodeViewerControls";
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

      <div className="code-viewer-controls">
        <CodeViewerControls />
      </div>

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
    "code-viewer-controls code-viewer code-viewer code-viewer";
  grid-template-rows: repeat(2, 1fr) auto;
  grid-template-columns: 270px repeat(3, 1fr);
  gap: ${({ theme }) => theme.space.common};
  height: 100vh;

  .grid-controls {
    grid-area: grid-controls;
    height: 100vh;
  }

  .grid-entries {
    grid-area: grid-entries;
    height: 100%;
  }

  .code-viewer-controls {
    grid-area: code-viewer-controls;
  }

  .code-viewer {
    grid-area: code-viewer;
  }
`;

export default GridEditor;
