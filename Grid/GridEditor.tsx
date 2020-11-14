import { Box, Grid } from '@primer/components';
import { GridState } from 'css-grid-template-parser';
import React, { FC } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useTheme } from 'styled-components';
import CodeBlock from '../components/CodeBlock';
import { GridAreas } from './GridValues';
import GridControls from './GridControls';
import GridGapControls from './GridGapControls';
import { gridHistoryState, gridState } from './gridState';
import ResetButton from './ResetButton';

export const GridEditor: FC<{ data: GridState }> = ({ data }) => {
  const [grid, setGridState] = useRecoilState(gridState);
  const [gridHistory, setGridHistory] = useRecoilState(gridHistoryState);
  const { sidebarWidth, navbarHeight } = useTheme();
  if (!grid) setGridState(data);
  if (!gridHistory) setGridHistory([data]);
  return (
    <Grid
      gridTemplateColumns="auto 1fr"
      maxHeight="calc(100vh -  4rem)"
      height="100vh"
      overflow="hidden"
    >
      <Grid
        gridTemplateColumns="1fr"
        padding={2}
        bg="bg.gray"
        width={sidebarWidth + 'px'}
        maxHeight={`calc(100vh - ${navbarHeight})`}
        overflowY="auto"
      >
        <GridControls id="rows" />
        <GridControls id="columns" />
        <GridGapControls />
        <div>
          <ResetButton />
        </div>
        <Box>
          <CodeBlock language="json" code={JSON.stringify(grid, null, 3)} />
        </Box>
      </Grid>
      <GridAreas />
    </Grid>
  );
};

const State = () => {
  const state = useRecoilValue(gridState);
  return <CodeBlock language="json" code={JSON.stringify(state, null, 2)} />;
};

GridEditor.displayName = 'GridEditor';
