import { grid, GridState } from '@/store/grid';
import Box from '@/ui/Box';
import React from 'react';
import { useRecoilState } from 'recoil';
import { omit } from '../../lib/utils';
import { useUser } from '../../store/auth';
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
  if (!gridState) return null;

  return (
    <GridEditorLayout maxHeight="calc(100vh - 40px)">
      <aside className="grid-sidebar">
        <GridEditorControls />
        <GridEditorResetButton />
      </aside>
      <Box id="screenshot" className="grid-entries">
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
