import Box from '@/ui/Box';
import { useFormikContext } from 'formik';
import React from 'react';
import styled from 'styled-components/macro';
import { layout } from 'styled-system';
import Button from '@/ui/Button';
import createGridAreasArray from './createGridItems';
import { EditorControlStack } from './EditorControlStack';
import GridAreas from './GridAreas';
import { GridState } from './GridState';
export interface GridEditorProps {
  endpoint: string;
  initialValues?: GridState;
  test?: GridState;
}
const GridEditor: React.FC<GridEditorProps> = () => {
  const formik = useFormikContext<GridState>();

  const areas = createGridAreasArray(
    formik.values.gridTemplateRows,
    formik.values.gridTemplateColumns
  );

  return (
    <Layout>
      <Sidebar>
        <EditorControlStack name="gridTemplateRows" />
        <EditorControlStack name="gridTemplateColumns" />
        <EditorControlStack name="gridGap" />
        <Button
          disabled={formik.dirty}
          color={formik.dirty ? 'primary' : 'secondary'}
        >
          Save
        </Button>
      </Sidebar>

      <GridAreas className="grid-items" areas={areas} />

      {/*   <button type="submit" onClick={formik.handleSubmit}>
        submit
      </button> */}
    </Layout>
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
  padding: 0;
  color: var(--color-text);
  background-color: var(--color-secondary);
  border-right-color: var(--color-muted);
  border-right-width: 1px;
  border-right-style: solid;
  padding: var(--space-1);
  :first-child {
  }

  section:not(:last-child) {
    ul {
      margin-top: var(--space-3);
      max-height: 30vh;
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
};
toolbar {
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

  /* Input */
  @supports selector(:) {
    button:focus {
      outline: none;
    }
  }
`;

Layout.displayName = 'GridEditorLayout';
export default GridEditor;
