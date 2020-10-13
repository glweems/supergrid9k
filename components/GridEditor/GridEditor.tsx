import { Box, Button, ButtonGroup, Flex } from '@primer/components';
import { FormikProvider, useFormik } from 'formik';
import React from 'react';
import styled from 'styled-components/macro';
import { layout } from 'styled-system';
import { GridState } from '../../css-grid-template-parser/GridState';
import CodeBlock from '../CodeBlock';
import Tabs from '../Tabs';
import { EditorControlStack } from './EditorControlStack';
import GridAreas from './GridAreas';

export interface GridEditorProps {
  initialValues: GridState;
}

const GridEditor: React.FC<GridEditorProps> = ({ initialValues }) => {
  const formikBag = useFormik<GridState>({
    initialValues,
    onSubmit: (values) => {
      console.debug('values: ', values);
    },
  });

  return (
    <FormikProvider value={formikBag}>
      <Layout>
        <Sidebar sidebarWidth={formikBag.values.editor.sidebarWidth}>
          <Tabs
            tabs={{
              controls: (
                <React.Fragment>
                  <EditorControlStack name="gridTemplateRows" />
                  <EditorControlStack name="gridTemplateColumns" />
                  <EditorControlStack name="gridGap" />
                  <ButtonGroup
                    css={`
                      margin-top: auto;
                      align-self: flex-end;
                      position: sticky;
                      bottom: 1rem;
                      right: 0;
                      z-index: 1000;
                      width: 100%;
                      padding: 0.25rem;
                    `}
                  >
                    <Button
                      width="50%"
                      disabled={!formikBag.dirty}
                      onClick={formikBag.handleReset}
                      bg="red.5"
                      sx={{
                        ':disabled': { bg: 'red.3' },
                        ':hover': { bg: 'red.6' },
                      }}
                    >
                      Reset
                    </Button>
                    <Button
                      disabled={!formikBag.dirty}
                      width="50%"
                      bg="blue.5"
                      sx={{
                        ':disabled': { bg: 'blue.3' },
                        ':hover': { bg: 'blue.6' },
                      }}
                    >
                      Save
                    </Button>
                  </ButtonGroup>
                </React.Fragment>
              ),
              code: (
                <Box width="40vw">
                  <Flex>
                    <CodeBlock
                      canCopy={false}
                      language="json"
                      code={JSON.stringify(
                        {
                          gridTemplateAreas: formikBag.values.gridTemplateAreas(),
                          selected: formikBag.values.selected,
                          areas: formikBag.values.areas,
                        },
                        null,
                        2
                      )}
                    />
                  </Flex>
                  <CodeBlock
                    canCopy={false}
                    comment="code"
                    language="json"
                    code={JSON.stringify(formikBag.values, null, 2)}
                  />
                </Box>
              ),
            }}
          />
        </Sidebar>

        <GridAreas className="grid-items" />

        {/*   <button type="submit" onClick={formik.handleSubmit}>
          submit
        </button> */}
      </Layout>
    </FormikProvider>
  );
};
type SidebarProps = Pick<GridState['editor'], 'sidebarWidth'>;
const Sidebar = styled.aside<SidebarProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  grid-area: sidebar;
  align-content: center;
  width: ${(props) => props && props.sidebarWidth};
  height: 100vh;
  max-height: calc(100vh - 4rem);
  margin: 0;
  padding: var(--space-1);
  overflow: auto;
  color: var(--color-text);
  background-color: var(--color-secondary);
`;

const Layout = styled(Box)`
  ${layout};
  display: grid;
  grid-template-areas:
    'sidebar grid'
    'sidebar grid';
  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr;
  width: 100vw;
  height: calc(100vh - 4.5rem);
  max-height: calc(100vh - 4.5rem);
  overflow-y: hidden;

  .toolbar {
    display: flex;
    justify-content: flex-end;
    padding: var(--space-2);
  }

  .grid-items {
    grid-area: grid;
  }

  form {
    margin: 0;
  } /* max-width: 100vw; */
`;

Layout.displayName = 'GridEditorLayout';
export default GridEditor;
