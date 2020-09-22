import theme from '@/lib/theme';
import { grid, GridState } from '@/store/grid';
import Box from '@/ui/Box';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import React from 'react';
import { Button, Flex } from 'rebass/styled-components';
import { useRecoilState } from 'recoil';
import styled from 'styled-components/macro';
import { layout, LayoutProps } from 'styled-system';
import { ArrowShortLeftIcon } from '@/lib/Icons';
import { omit } from '@/lib/utils';
import { useUser } from '@/store/auth';
import If from '@/components/If';
import GridEditorName from './GridEditorName';
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
  const obj = useCleanGridState(gridProp);

  React.useEffect(() => {
    if (!gridState) {
      setGridState(obj);
    }
  }, [gridState, obj, setGridState]);

  // const gelProps = { controlPanelWidth, codePanelWidth };

  return (
    <If isTrue={gridState !== null}>
      <GridEditorLayout
        maxHeight="calc(100vh - 40px)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Box as={motion.aside} className="grid-sidebar" height="100%">
          <GridEditorName />
          <GridEditorControls />
        </Box>

        <Box id="screenshot" className="grid-entries">
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
      </GridEditorLayout>
    </If>
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
