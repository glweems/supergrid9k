import React from "react";
import styled from "styled-components";
import Box from "../../ui/Box";
import GithubButton from "../../ui/GithubButton";
import CodeSnippets from "../CodeSnippets/CodeSnippets";
import GridEditorControls from "./GridEditorControls";
import GridEntries from "./GridEntries";
import { Text } from "rebass/styled-components";
const GridEditor: React.FC = () => {
  return (
    <Layout>
      <aside className="grid-sidebar">
        <Text as="h1">SuperGrid9K</Text>
        <GithubButton title="View On Github">View On Github</GithubButton>
        <GridEditorControls />
      </aside>

      <Box as="main" className="grid-entries">
        <GridEntries height="100%" />
      </Box>

      <section className="code-viewer">
        <CodeSnippets />
      </section>
    </Layout>
  );
};

const Layout = styled(Box)`
  display: grid;
  grid-template-areas:
    "grid-sidebar grid-entries"
    "grid-sidebar code-viewer";
  grid-template-rows: 1fr 30%;
  grid-template-columns: 300px 1fr;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .grid-sidebar {
    grid-area: grid-sidebar;
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.darks[3]};
    border-right: 2px solid ${({ theme }) => theme.colors.lights[1]};
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
`;

export default GridEditor;
