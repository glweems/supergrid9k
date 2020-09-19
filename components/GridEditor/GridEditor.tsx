import { grid, GridState } from '@/store/grid';
import Box from '@/ui/Box';
import React from 'react';
import { Button, Flex } from 'rebass/styled-components';
import { useRecoilState } from 'recoil';
import { omit } from '../../lib/utils';
import { useUser } from '../../store/auth';
import CodePenButton from '../CodePenButton';
import CodeViewer from '../CodeViewer';
import CodeViewerControls from '../CodeViewerControls';
import GridEditorControls from './GridEditorControls';
import GridEditorItems from './GridEditorItems';
import GridEditorResetButton from './GridEditorResetButton';
import SaveTemplateButton from './SaveTemplateButton';
import styled from 'styled-components/macro';
import theme from '@/lib/theme';
import { LayoutProps, layout } from 'styled-system';
import GridEditorName from './GridEditorName';
import { ArrowShortLeftIcon } from '../../lib/Icons';
import ResizePanel from 'react-resize-panel';
import { AnimatePresence, motion } from 'framer-motion';

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
  const obj = useCleanGridState(gridProp);

  React.useEffect(() => {
    if (!gridState) {
      setGridState(obj);
    }
  }, [gridState, obj, setGridState]);

  // const gelProps = { controlPanelWidth, codePanelWidth };

  return (
    <AnimatePresence>
      {gridState && (
        <GridEditorLayout
          maxHeight="calc(100vh - 40px)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <aside className="grid-sidebar">
            <GridEditorName />
            <GridEditorControls />
          </aside>

          <Box id="screenshot" className="grid-entries">
            <GridEditorItems />
          </Box>

          <footer className="toolbar">
            <Button>
              <ArrowShortLeftIcon />
            </Button>
            <Flex>
              <CodePenButton />
              <GridEditorResetButton />
              <SaveTemplateButton />
            </Flex>
            <Button>
              <ArrowShortLeftIcon />
            </Button>
          </footer>
        </GridEditorLayout>
      )}
    </AnimatePresence>
  );
};

export default GridEditor;

const GridEditorLayout = motion.custom(styled.main<LayoutProps>`
  ${layout};
  display: grid;
  grid-template-areas:
    'toolbar toolbar toolbar'
    'grid-sidebar grid-entries code-viewer'
    'grid-sidebar grid-entries code-viewer';
  grid-template-rows: auto 1fr auto;
  grid-template-columns: auto 1fr auto;
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

  .grid-sidebar {
    position: sticky;
    top: 1rem;
    right: 1rem;
    grid-area: grid-sidebar;

    padding: var(--space-3);
    overflow-y: auto;
    color: var(--color-text);
    width: 250px;
  }

  .grid-entries {
    grid-area: grid-entries;
  }

  .code-viewer {
    grid-area: code-viewer;
    width: 300px;

    padding: var(--space-3);
    overflow-y: auto;
    color: var(--color-text);

    .CodePenButton,
    .SaveTemplateButton {
      width: calc(100% - var(--space-3));
    }

    .SaveTemplateButton {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 100%;
      margin: auto;
      color: var(--color-text);
      background-color: var(--color-primary);
    }
    pre {
      height: fit-content;
      font-size: 14px;
    }
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

GridEditorLayout.displayName = 'GridEditorLayout';
GridEditorLayout.defaultProps = { theme };

/* import dynamic from 'next/dynamic';
const GridEditorLayout = dynamic(() => import('./GridEditorLayout'));
const GridEditorControls = dynamic(() => import('./GridEditorControls'));
const CodeViewerControls = dynamic(() => import('../CodeViewerControls'));
const GridEditorItems = dynamic(() => import('./GridEditorItems'));
const CodeViewer = dynamic(() => import('../CodeViewer'));
const GridEditorResetButton = dynamic(() => import('./GridEditorResetButton')); */
