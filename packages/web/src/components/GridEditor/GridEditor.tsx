import React from 'react';
import { useRecoilState } from 'recoil';
import { grid, GridState } from '../../store/grid';
import { ui, useGridEditorUi } from '../../store/ui';
import Box from '../../ui/Box';
import CodePenButton from '../CodePenButton';
import CodeViewer from '../CodeViewer';
import CodeViewerControls from '../CodeViewerControls';
import GridEditorControls from './GridEditorControls';
import GridEditorItems from './GridEditorItems';
import GridEditorLayout from './GridEditorLayout';
import GridEditorResetButton from './GridEditorResetButton';
import SaveTemplateButton from './SaveTemplateButton';
import { Button } from 'rebass/styled-components';
import { ArrowShortLeftIcon } from '../../lib/Icons';
import { AnimatePresence, motion } from 'framer-motion';
export interface GridEditorProps {
  grid?: GridState;
}

const GridEditor: React.FC<GridEditorProps> = ({ grid: gridProp }) => {
  const [gridState, setGridState] = useRecoilState(grid);
  const { isControlsOpen, controlPanelWidth, isSnippetsVisable, codePanelWidth, handleClick } = useGridEditorUi();
  if (gridProp) setGridState(gridProp);
  if (!gridState) return null;

  const gelProps = { controlPanelWidth, codePanelWidth };

  return (
    <GridEditorLayout maxHeight="calc(100vh - 40px)" {...gelProps}>
      <AnimatePresence>
        {isControlsOpen ? (
          <Box
            as={motion.aside}
            className="grid-sidebar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, width: controlPanelWidth }}
            exit={{ opacity: 0, width: 0, x: -100 }}
          >
            <Button name="isControlsOpen" bg="secondary" width="100%" marginBottom={4} onClick={handleClick}>
              <ArrowShortLeftIcon />
            </Button>
            <GridEditorControls />
            <GridEditorResetButton />
          </Box>
        ) : (
          <div className="grid-sidebar" />
        )}
      </AnimatePresence>

      <Box className="grid-entries">
        <GridEditorItems />
      </Box>

      <Box as="aside" className="code-viewer">
        <CodeViewerControls />
        <CodeViewer />
        <SaveTemplateButton />
        <CodePenButton />
      </Box>
    </GridEditorLayout>
  );
};

export default GridEditor;
/*
const GridEditorLayout = dynamic(() => import('./GridEditorLayout'));
const GridEditorControls = dynamic(() => import('./GridEditorControls'));
const CodeViewerControls = dynamic(() => import('../CodeViewerControls'));
const GridEditorItems = dynamic(() => import('./GridEditorItems'));
const CodeViewer = dynamic(() => import('../CodeViewer'));
const GridEditorResetButton = dynamic(() => import('./GridEditorResetButton')); */
