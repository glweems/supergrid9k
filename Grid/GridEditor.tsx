import { Box, Grid } from '@primer/components';
import { GridState } from 'css-grid-template-parser';
import React, { FC } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useTheme } from 'styled-components';
import CodeBlock from '../components/CodeBlock';
import { GridAreas } from './GridAreas';
import GridControls from './GridControls';
import GridGapControls from './GridGapControls';
import { gridState } from './gridState';

export const GridEditor: FC<{ data: GridState }> = ({ data }) => {
  const [grid, setGridState] = useRecoilState(gridState);
  const { sidebarWidth } = useTheme();
  if (!grid) setGridState(data);
  return (
    <Grid gridTemplateColumns="auto 1fr" height="calc(100% -  4rem)">
      <Grid
        gridTemplateColumns="1fr"
        padding={2}
        bg="bg.gray"
        width={sidebarWidth + 'px'}
      >
        <GridControls id="rows" />
        <GridControls id="columns" />
        <GridGapControls />
      </Grid>
      <GridAreas />
      <State />
    </Grid>
  );
};
const State = () => {
  const state = useRecoilValue(gridState);
  return <CodeBlock language="json" code={JSON.stringify(state, null, 2)} />;
};

GridEditor.displayName = 'GridEditor';
