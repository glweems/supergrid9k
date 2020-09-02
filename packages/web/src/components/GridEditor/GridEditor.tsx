import dynamic from 'next/dynamic';
import React from 'react';
import { useRecoilState } from 'recoil';
import { grid, GridState } from '../../state';
import Box from '../../ui/Box';
import CodePenButton from '../CodePenButton';
import SaveTemplateButton from './SaveTemplateButton';

const GridEditorLayout = dynamic(() => import('./GridEditorLayout'));
const GridEditorControls = dynamic(() => import('./GridEditorControls'));
const CodeViewerControls = dynamic(() => import('../CodeViewerControls'));
const GridEditorItems = dynamic(() => import('./GridEditorItems'));
const CodeViewer = dynamic(() => import('../CodeViewer'));
const GridEditorResetButton = dynamic(() => import('./GridEditorResetButton'));

export interface GridEditorProps {
  grid?: GridState;
}

const GridEditor: React.FC<GridEditorProps> = ({ grid: gridProp }) => {
  const [gridState, setGridState] = useRecoilState(grid);
  if (gridProp) setGridState(gridProp);
  if (!gridState) return null;
  return (
    <GridEditorLayout maxHeight="calc(100vh - 40px)">
      <aside className="grid-sidebar">
        <GridEditorControls />
        <GridEditorResetButton />
      </aside>

      <Box className="grid-entries">
        <GridEditorItems />
      </Box>

      <section className="code-viewer">
        <CodeViewerControls />
        <CodeViewer />
        <SaveTemplateButton />
        <CodePenButton />
      </section>
    </GridEditorLayout>
  );
};

export default GridEditor;
