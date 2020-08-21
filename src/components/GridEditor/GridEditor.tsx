import dynamic from "next/dynamic";
import React from "react";
import Div100vh from "react-div-100vh";
import { Text } from "rebass/styled-components";
import Box from "../../ui/Box";
import { SuperGrid9kCodePen } from "../CodePenButton";

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
        <aside className="grid-sidebar">
          <Box className="info">
            <Text as="h1">SuperGrid9K</Text>
            <GithubButton />
          </Box>

          <GridEditorControls />

          <GridEditorResetButton />
        </aside>

        <Box className="grid-entries">
          <GridEditorItems />
        </Box>

        <section className="code-viewer">
          <CodeViewerControls />
          <CodeViewer />
          <SuperGrid9kCodePen />
        </section>
      </Layout>
    </Div100vh>
  );
};

export default GridEditor;
