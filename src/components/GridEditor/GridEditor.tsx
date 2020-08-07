import React from "react";
import { useRecoilValue, RecoilValueReadOnly } from "recoil";
import styled from "styled-components";
import media from "styled-media-query";
import { codeBlock } from "../../store/code";
import Box from "../../ui/Box";
import GithubButton from "../../ui/GithubButton";
import CodePenButton from "../CodePenButton";
import CodeViewer from "../CodeViewer";
import CodeViewerControls from "../CodeViewerControls";
import GridEditorControls from "./GridEditorControls";
import GridEntries from "./GridEntries";
import { CodeBlockProps } from "../CodeBlock";

const GridEditor: React.FC = () => {
  const [{ code: css }, { code: html }] = useRecoilValue(
    codeBlock as RecoilValueReadOnly<CodeBlockProps[]>
  );

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
        <CodePenButton data={{ title: "cssGrid", css, html }} />
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
    overflow-y: auto;
    height: 100vh;
    padding-bottom: ${({ theme }) => theme.space[4]}px;
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
