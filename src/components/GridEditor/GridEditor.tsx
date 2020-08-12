import dynamic from "next/dynamic";
import React from "react";
import { Text } from "rebass/styled-components";
import Box from "../../ui/Box";
import { SuperGrid9kCodePen } from "../CodePenButton";
import styled from "styled-components";

const Layout = dynamic(() => import("../../ui/Layout"));
const GridEditorControls = dynamic(() => import("./GridEditorControls"));
const CodeViewerControls = dynamic(() => import("./../CodeViewerControls"));
const GridEditorItems = dynamic(() => import("./GridEditorItems"));
const CodeViewer = dynamic(() => import("../CodeViewer"));
const GithubButton = dynamic(() => import("../../ui/GithubButton"));
const GridEditorResetButton = dynamic(() => import("./GridEditorResetButton"));

const GridEditor: React.FC = () => {
  return (
    <Layout>
      <Sidebar className="grid-sidebar">
        <div>
          <Text as="h1">SuperGrid9K</Text>
          <GithubButton />
        </div>
        <GridEditorControls />
        <Box>
          <GridEditorResetButton />
        </Box>
        <CodeViewerControls />
      </Sidebar>

      <Box as="main" className="grid-entries">
        <GridEditorItems height="100%" />
      </Box>

      <Box
        as="section"
        display="flex"
        width="100%"
        justifyContent="space-around"
        className="code-viewer"
        bg="code"
      >
        <CodeViewer />
      </Box>
    </Layout>
  );
};

const Sidebar = styled.aside``;

export default GridEditor;
