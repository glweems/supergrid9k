import { Box, ButtonOutline, Grid } from '@primer/components';
import { GridState } from 'css-grid-template-parser';
import React, { FC } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useTheme } from 'styled-components';
import CodeBlock from '../components/CodeBlock';
import { GridAreas } from './GridAreas';
import GridControls from './GridControls';
import GridGapControls from './GridGapControls';
import { gridHistoryState, gridState } from './gridState';

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
      </Grid>
      <GridAreas />
    </Grid>
  );
};

const ResetButton = () => {
  const setGridState = useSetRecoilState(gridState);
  const history = useRecoilValue(gridHistoryState);
  const handleClick = (
    _e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => setGridState(history[0]);
  return (
    <ButtonOutline
      sx={{
        borderColor: 'red.1',
        color: 'red.5',
        width: '100%',
        ':hover': { backgroundColor: 'red.5' },
      }}
      onClick={handleClick}
    >
      Reset
    </ButtonOutline>
  );
};
const State = () => {
  const state = useRecoilValue(gridState);
  return <CodeBlock language="json" code={JSON.stringify(state, null, 2)} />;
};

GridEditor.displayName = 'GridEditor';
