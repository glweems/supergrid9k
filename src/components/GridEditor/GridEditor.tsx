import React from "react";
import styled from "styled-components";
import media from "styled-media-query";
import Box from "../../ui/Box";
import CodeViewer from "../CodeViewer";
import CodeViewerControls from "../CodeViewerControls";
import GridEditorControls from "./GridEditorControls";
import GridEntries from "./GridEntries";
import GithubButton from "../../ui/GithubButton";

const GridEditor: React.FC = () => {
  return (
    <Layout bg="dark" color="light">
      <aside className="grid-sidebar">
        <h1>SuperGrid9K</h1>
        <GithubButton title="View On Github">View On Github</GithubButton>
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
  grid-template-columns: 275px 1fr 330px;
  overscroll-behavior-y: none;
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
    padding-right: ${({ theme }) => theme.space[3]}px;
    padding-left: ${({ theme }) => theme.space[3]}px;
  }

  ${media.lessThan("medium")`
  grid-template-areas:
    "grid-sidebar" "grid-entries" "code-viewer";
  grid-template-columns: 1fr;
  grid-template-rows: auto 100vh auto;
  max-height: unset;
  overflow: unset;
  `};
`;

export default GridEditor;
