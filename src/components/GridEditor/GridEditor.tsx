import React from "react";
import styled from "styled-components";
import Box from "../../ui/Box";
import CodeViewer from "../CodeViewer";
import CodeViewerControls from "../CodeViewerControls";
import GridEditorControls from "./GridEditorControls";
import GridEntries from "./GridEntries";

const GridEditor: React.FC = () => {
  return (
    <Layout bg="dark" color="light">
      <aside className="grid-sidebar">
        <h1>SuperGrid9K</h1>
        <GridEditorControls />
      </aside>

      <Box className="grid-entries">
        <GridEntries height="100%" />
      </Box>

      <aside className="code-viewer">
        <h2>Generated Code</h2>
        <CodeViewerControls />
        <CodeViewer />
      </aside>
    </Layout>
  );
};

const Layout = styled(Box)`
  display: grid;
  grid-template-areas:
    "grid-sidebar grid-entries code-viewer"
    "grid-sidebar grid-entries code-viewer";
  grid-template-rows: 100vh;
  grid-template-columns: 250px 1fr 330px;
  max-height: 100vh;
  overflow: hidden;

  .grid-sidebar {
    grid-area: grid-sidebar;
  }

  .grid-entries {
    grid-area: grid-entries;
  }

  .code-viewer {
    grid-area: code-viewer;
  }

  aside {
    padding: ${({ theme }) => theme.space.common};
  }
`;

export default GridEditor;
