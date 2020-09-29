import { GridControlObjKey } from '@/store/grid';
import Box from '@/ui/Box';
import {
  entriesArrayParser,
  Entry,
  flatten,
  RawGridState,
} from 'css-grid-template-parser';
import React from 'react';
import { use100vh } from 'react-div-100vh';
import styled, { useTheme } from 'styled-components/macro';
import { layout } from 'styled-system';
import useSWR, { mutate } from 'swr';
import {
  EditorControlStack,
  EditorControlStackProps,
} from './EditorControlStack';
import GridAreas from './GridAreas';
export interface GridEditorProps {
  endpoint: string;
  grid?: RawGridState;
  initialData?: RawGridState;
}

const GridEditor: React.FC<GridEditorProps> = ({ endpoint, initialData }) => {
  const vp = use100vh();
  const theme = useTheme();

  const { data } = useSWR<RawGridState, RawGridState>(endpoint);
  // const idk = React.useMemo(() => createGridState(data), [data]);

  const mutator = (val: Entry[]) => mutate(endpoint, flatten(val), false);
  if (!data) return <div>loading</div>;

  const controlStackProps = (
    objKey: GridControlObjKey
  ): EditorControlStackProps => {
    const arr = entriesArrayParser(data[objKey]);
    return {
      endpoint,
      objKey,
      controls: arr,
      mutator,
      canDelete: arr.length < 2,
    };
  };

  return (
    <Layout>
      <Sidebar>
        <EditorControlStack {...controlStackProps('gridTemplateRows')} />
        <EditorControlStack {...controlStackProps('gridTemplateColumns')} />
        <EditorControlStack {...controlStackProps('gridGap')} />
      </Sidebar>

      <GridAreas
        className="grid-items"
        endpoint={endpoint}
        initialData={data}
      />
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
  height: ${({ theme }) => `calc(100vh - ${theme.navbarHeight})`};

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

  /* Input */
  @supports selector(:) {
    button:focus {
      outline: none;
    }
  }
`;

Layout.displayName = 'GridEditorLayout';
export default GridEditor;
