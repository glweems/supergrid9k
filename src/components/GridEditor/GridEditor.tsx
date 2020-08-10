import React from "react";
import { Text } from "rebass/styled-components";
import Box from "../../ui/Box";
import GithubButton from "../../ui/GithubButton";
import Layout from "../../ui/Layout";
import { SuperGrid9kCodePen } from "../CodePenButton";
import CodeSnippet from "../CodeSnippet";
import GridEditorControls from "./GridEditorControls";
import GridEntries from "./GridEntries";

const GridEditor: React.FC = () => {
  return (
    <Layout>
      <aside className="grid-sidebar">
        <Text as="h1">SuperGrid9K</Text>
        <GithubButton>View Code</GithubButton>
        <GridEditorControls />
        <SuperGrid9kCodePen />
      </aside>

      <Box as="main" className="grid-entries">
        <GridEntries height="100%" />
      </Box>

      <section className="code-viewer">
        <CodeSnippet language="css" />
        <CodeSnippet language="html" />
      </section>
    </Layout>
  );
};

export default GridEditor;
