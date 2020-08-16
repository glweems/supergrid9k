import dynamic from "next/dynamic";
import React from "react";
import Div100vh from "react-div-100vh";
import { Text } from "rebass/styled-components";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { grid } from "../../state";
import Box from "../../ui/Box";
import CodeBlock from "../CodeBlock";

const Layout = dynamic(() => import("../../ui/Layout"));
const GridEditorControls = dynamic(() => import("./GridEditorControls"));
const CodeViewerControls = dynamic(() => import("./../CodeViewerControls"));
const GridEditorItems = dynamic(() => import("./GridEditorItems"));
const CodeViewer = dynamic(() => import("../CodeViewer"));
const GithubButton = dynamic(() => import("../../ui/GithubButton"));
const GridEditorResetButton = dynamic(() => import("./GridEditorResetButton"));

const GridEditor: React.FC = () => {
  const [state] = useRecoilState(grid);
  return (
    <Div100vh>
      <Layout>
        <Sidebar className="grid-sidebar">
          <div>
            <CodeBlock language="json" code={JSON.stringify(state, null, 2)} />
            {/* <Text as="h1">SuperGrid9K</Text>
            <GithubButton /> */}
          </div>
          <GridEditorControls />
          <Box>
            <GridEditorResetButton />
          </Box>
          <CodeViewerControls />
        </Sidebar>

        <Box className="grid-entries">
          <GridEditorItems
            height="100%"
            css={`
              overflow: hidden;
            `}
          />
        </Box>
        <Box as="section" display="flex" width="100%" className="code-viewer">
          <CodeViewer />
        </Box>
      </Layout>
    </Div100vh>
  );
};

const Sidebar = styled.aside``;

export default GridEditor;
