import { grid, GridState } from '@/store/grid';
import Box from '@/ui/Box';
import React from 'react';
import { useRecoilState } from 'recoil';
import CodePenButton from '../CodePenButton';
import CodeViewer from '../CodeViewer';
import CodeViewerControls from '../CodeViewerControls';
import GridEditorControls from './GridEditorControls';
import GridEditorItems from './GridEditorItems';
import GridEditorLayout from './GridEditorLayout';
import GridEditorResetButton from './GridEditorResetButton';
import SaveTemplateButton from './SaveTemplateButton';

export interface GridEditorProps {
  grid?: GridState;
}

const GridEditor: React.FC<GridEditorProps> = ({ grid: gridProp }) => {
  console.log('gridProps', gridProp);
  const [gridState, setGridState] = useRecoilState(grid);

  React.useEffect(() => {
    if (!gridState) {
      console.log(gridProp);
      setGridState(gridProp);
    }
  }, [gridProp, gridState, setGridState]);

  // const gelProps = { controlPanelWidth, codePanelWidth };
  if (!gridState) return null;

  return (
    <GridEditorLayout maxHeight="calc(100vh - 40px)">
      <div className="grid-sidebar">
        <GridEditorControls />
        <GridEditorResetButton />
      </div>
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
/* import dynamic from 'next/dynamic';
const GridEditorLayout = dynamic(() => import('./GridEditorLayout'));
const GridEditorControls = dynamic(() => import('./GridEditorControls'));
const CodeViewerControls = dynamic(() => import('../CodeViewerControls'));
const GridEditorItems = dynamic(() => import('./GridEditorItems'));
const CodeViewer = dynamic(() => import('../CodeViewer'));
const GridEditorResetButton = dynamic(() => import('./GridEditorResetButton')); */
