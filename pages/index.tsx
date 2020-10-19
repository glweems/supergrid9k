import Navbar from '@/ui/Navbar';
import { BorderBox, Grid } from '@primer/components';
import {
  GridState,
  groupRepeatedUnits,
  template,
  track,
} from 'css-grid-template-parser';
import { GetServerSideProps, NextPage } from 'next';
import React, { FC, memo } from 'react';
import Div100Vh from 'react-div-100vh';
import { selector, useRecoilState, useRecoilValue } from 'recoil';
import GridControls from '../Grid/GridControls';
import GridGapControls from '../Grid/GridGapControls';
import { gridState } from '../Grid/gridState';
import { fetcher } from '../lib/fetcher';
import { AppConfig } from './api/grid/template';
export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetcher<AppConfig>('/api/grid/template');
  return { props: data };
};

const IndexPage: NextPage<AppConfig> = ({ grid: data }) => {
  return (
    <Div100Vh>
      <Navbar />
      <GridEditor data={data} />
    </Div100Vh>
  );
};
const GridEditor: FC<{ data: GridState }> = memo(({ data }) => {
  const [grid, setGridState] = useRecoilState(gridState);
  if (!grid) setGridState(data);
  return (
    <Grid gridTemplateColumns="auto 1fr" height="calc(100% -  4rem)">
      <Grid gridTemplateColumns="1fr" padding={2} bg="bg.gray">
        <GridControls id="rows" />
        <GridControls id="columns" />
        <GridGapControls />
      </Grid>
      <GridAreas />
    </Grid>
  );
});

const gridCssState = selector({
  key: 'gridCss',
  get: ({ get }) => {
    const grid = get(gridState);
    if (!grid) return;

    const { rows, columns, areas, gap } = grid;
    const rowGap = `${gap.rowGap.amount}${gap.rowGap.unit}`;
    const columnGap = `${gap.columnGap.amount}${gap.columnGap.unit}`;
    return {
      gridTemplateRows: groupRepeatedUnits(rows),
      gridTemplateColumns: groupRepeatedUnits(columns),
      gridTemplateAreas: template({
        width: rows.length,
        height: columns?.length,
        areas,
      }),
      rowGap,
      columnGap,
    };
  },
});

const gridAreasState = selector({
  key: 'gridAreas',
  get: ({ get }) => {
    const css = get(gridCssState);
    const items = css?.gridTemplateAreas
      .replace(/["]+/g, '')
      .split('\n')
      .flatMap((rowStr, rowStart) =>
        rowStr.split(' ').map((name, colStart) => {
          const row = track(rowStart + 1, rowStart + 2);
          const column = track(colStart + 1, colStart + 2);
          const gridArea = [row.start, column.start, row.end, column.end].join(
            '/'
          );

          return { name, gridArea, row, column };
        })
      );
    return items;
  },
});

const GridAreas: FC = (props) => {
  const gridCss = useRecoilValue(gridCssState);

  const gridAreas = useRecoilValue(gridAreasState);
  return (
    <Grid style={gridCss}>
      {gridAreas?.map((area, i) => (
        <BorderBox key={i} bg="blue.3" borderColor="blue.5" borderWidth="2px">
          asdf
        </BorderBox>
      ))}
    </Grid>
  );
};
GridEditor.displayName = 'GridEditor';
export type GridControlsKey = keyof Pick<GridState, 'rows' | 'columns'>;

export default IndexPage;
