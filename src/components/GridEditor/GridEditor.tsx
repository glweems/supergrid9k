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
      <Box as="aside" className="grid-sidebar" bg="dark" color="light">
        <Box padding={2}>
          <h1>SuperGrid9K</h1>
          <GridEditorInputs />
          <CodeViewerControls />
          <CodeViewer />
        </Box>
      </Box>

      <Box className="grid-entries">
        <GridEntries height="100%" />
      </Box>

      <div className="code-viewer">
        <CodeViewerControls />
        <CodeViewer />
      </div>
    </Layout>
  );
};

const Layout = styled(Box)`
  display: grid;
  grid-template-areas:
    "grid-sidebar grid-entries code-viewer"
    "grid-sidebar grid-entries code-viewer";
  grid-template-rows: 1fr auto;
  grid-template-columns: auto 1fr auto;
  max-height: 100vh;
  overflow: hidden;

  .grid-sidebar {
    grid-area: grid-sidebar;
    width: 330px;
    height: 100vh;
    max-height: 100vh;
  }

  .grid-entries {
    grid-area: grid-entries;
  }

  .code-viewer {
    grid-area: code-viewer;
    width: 0;
    pre {
      overflow-x: auto;
      text-overflow: scroll;
    }
    code {
      white-space: nowrap;
    }
  }
`;

export default GridEditor;
