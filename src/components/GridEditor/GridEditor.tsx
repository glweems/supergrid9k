import React from "react";
import styled from "styled-components";
import media from "styled-media-query";
import Box from "../../ui/Box";
import GithubButton from "../../ui/GithubButton";
import GridEditorControls from "./GridEditorControls";
import GridEntries from "./GridEntries";

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
    </Layout>
  );
};

const Layout = styled(Box)`
  display: grid;
  grid-template-areas:
    "grid-sidebar grid-entries"
    "grid-sidebar grid-entries";
  grid-template-rows: 100vh;
  grid-template-columns: 300px 1fr;
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
    padding-bottom: ${({ theme }) => theme.space[4]}px;
    padding-left: ${({ theme }) => theme.space[3]}px;
  }

  ${media.lessThan("medium")`
  grid-template-areas:
    "grid-sidebar" "grid-entries" "code-viewer";
  grid-template-columns: 1fr;
  grid-template-rows: auto 100vh auto;
  max-height: unset;
  overflow: unset;

  aside {
    overflow-y: unset;
    height: unset;
  }
  `};
`;

export default GridEditor;
