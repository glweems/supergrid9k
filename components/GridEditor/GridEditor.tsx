import Box from '@/ui/Box';
import Button from '@/ui/Button';
import { FormikProvider, useFormik } from 'formik';
import React from 'react';
import styled from 'styled-components/macro';
import { layout } from 'styled-system';
import { EditorControlStack } from './EditorControlStack';
import GridAreas from './GridAreas';
import { GridState } from './GridState';
export interface GridEditorProps {
  initialValues: GridState;
}
const GridEditor: React.FC<GridEditorProps> = ({ initialValues }) => {
  const formikBag = useFormik<GridState>({
    initialValues,
    onSubmit: (values, helper) => {
      console.log('helper: ', helper);
      console.log(values);
    },
  });

  return (
    <FormikProvider value={formikBag}>
      <Layout>
        <Sidebar>
          <EditorControlStack name="gridTemplateRows" />
          <EditorControlStack name="gridTemplateColumns" />
          <EditorControlStack name="gridGap" />
          <Button
            disabled={formikBag.dirty}
            color={formikBag.dirty ? 'primary' : 'secondary'}
          >
            Save
          </Button>
        </Sidebar>

        <GridAreas className="grid-items" />

        {/*   <button type="submit" onClick={formik.handleSubmit}>
        submit
      </button> */}
      </Layout>
    </FormikProvider>
  );
};

const Sidebar = styled.aside`
  display: grid;
  grid-area: sidebar;
  grid-template-rows: repeat(3, 1fr) auto;
  grid-template-columns: 1fr;
  width: ${({ theme }) => theme.sidebarWidth}px;
  height: ${({ theme }) => `calc(100vh - ${theme.navbarHeight})`};
  margin: 0;
  padding: var(--space-1);
  color: var(--color-text);
  background-color: var(--color-secondary);
  border-right-color: var(--color-muted);
  border-right-width: 1px;
  border-right-style: solid;

  section:not(:last-child) {
    ul {
      max-height: 30vh;
      margin-top: var(--space-3);
      overflow: hidden;
      overflow-y: auto;
    }
  }
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
