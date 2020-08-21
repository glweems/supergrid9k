import dynamic from "next/dynamic";
import React from "react";
import Div100vh from "react-div-100vh";
import { Text } from "rebass/styled-components";
import styled from "styled-components/macro";
import Box from "../../ui/Box";

const Layout = dynamic(() => import("../../ui/Layout"));
const GridEditorControls = dynamic(() => import("./GridEditorControls"));
const CodeViewerControls = dynamic(() => import("./../CodeViewerControls"));
const GridEditorItems = dynamic(() => import("./GridEditorItems"));
const CodeViewer = dynamic(() => import("../CodeViewer"));
const GithubButton = dynamic(() => import("../../ui/GithubButton"));
const GridEditorResetButton = dynamic(() => import("./GridEditorResetButton"));

const GridEditor: React.FC = () => {
  return (
    <Div100vh>
      <Layout>
        <Sidebar className="grid-sidebar">
          <Box className="info">
            <Text as="h1">SuperGrid9K</Text>
            <GithubButton />
          </Box>

          <GridEditorControls />

          <GridEditorResetButton />
        </Sidebar>

        <Box className="grid-entries">
          <GridEditorItems />
        </Box>

        <Viewer className="code-viewer">
          <CodeViewerControls />
          <CodeViewer />
        </Viewer>
      </Layout>
    </Div100vh>
  );
};

const Viewer = styled.section`
  display: grid;
  grid-template-columns: 300px repeat(2, min-content);
  gap: 1rem;
`;

const Sidebar = styled.aside`
  .info {
    padding: ${({ theme }) => theme.space[2]}px;
  }
`;

export default GridEditor;
