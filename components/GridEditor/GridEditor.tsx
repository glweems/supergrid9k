import { ArrowShortLeftIcon } from '@/lib/Icons';
import { omit } from '@/lib/utils';
import { useUser } from '@/store/auth';
import { grid, GridState } from '@/store/grid';
import Box from '@/ui/Box';
import Button from '@/ui/Button';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import React from 'react';
import { use100vh } from 'react-div-100vh';
import { Flex } from 'rebass/styled-components';
import { useRecoilState } from 'recoil';
import styled from 'styled-components/macro';
import { layout } from 'styled-system';
import { ui } from '../../store/ui';
import GridEditorName from './GridEditorName';
import { ToggleControlsButton } from './GridEditorToggleButtons';
import SaveTemplateButton from './SaveTemplateButton';
const GridEditorControls = dynamic(() => import('./GridEditorControls'));
const GridEditorItems = dynamic(() => import('./GridEditorItems'));
const GridEditorResetButton = dynamic(() => import('./GridEditorResetButton'));
export interface GridEditorProps {
  grid?: GridState;
}

function useCleanGridState(obj) {
  const user = useUser();

  const readyState = { ...omit(obj, '_id'), initalState: obj, user };
  return readyState;
}

const GridEditor: React.FC<GridEditorProps> = ({ grid: gridProp }) => {
  const [gridState, setGridState] = useRecoilState(grid);
  const [uiState] = useRecoilState(ui);
  const obj = useCleanGridState(gridProp);
  const vp = use100vh();
  const height = `calc(${vp}px - ${uiState.navbarHeight})`;
  React.useEffect(() => {
    if (!gridState) {
      setGridState(obj);
    }
  }, [gridState, obj, setGridState]);

  // const gelProps = { controlPanelWidth, codePanelWidth };

  return (
    <Layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      height={height}
    >
      <Box as={motion.aside} className="grid-sidebar">
        <div>
          <ToggleControlsButton />
          <GridEditorName />
          <GridEditorControls />
        </div>
      </Box>

      <Box className="grid-items" height="100%">
        <GridEditorItems />
      </Box>

      <motion.section className="toolbar">
        <Button>
          <ArrowShortLeftIcon />
        </Button>
        <Flex>
          <GridEditorResetButton />
          <SaveTemplateButton />
        </Flex>
        <Button>
          <ArrowShortLeftIcon />
        </Button>
      </motion.section>
    </Layout>
  );
};

export default GridEditor;

const Layout = motion.custom(styled(Box)`
  ${layout};
  display: grid;
  grid-template-areas:
    'grid-sidebar toolbar'
    'grid-sidebar grid-items';
  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr;
  width: 100vw;

  .toolbar {
    grid-area: toolbar;
    display: grid;
    grid-template-columns: auto 1fr auto;
    place-items: center;
    div {
      place-items: center;
      display: grid;
      grid-template-columns: auto 1fr auto;
    }
  }

  aside {
    grid-area: grid-sidebar;
    overflow-y: auto;
    color: var(--color-text);
    width: 250px;
    padding: 0;
    margin: 0;
    overflow: hidden;
    overflow-y: auto;
    color: var(--color-text);
    width: 250px;
    border-right-color: var(--color-muted);
    border-right-width: 1px;
    border-right-style: solid;
    background-color: var(--color-secondary);
    :first-child {
      padding: var(--space-3);
    }
  }

  .grid-items {
    grid-area: grid-items;
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
`);

Layout.displayName = 'GridEditorLayout';
