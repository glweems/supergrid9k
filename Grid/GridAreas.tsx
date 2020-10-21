import { BorderBox, BorderBoxProps, Grid } from '@primer/components';
import { GridState, Track } from 'css-grid-template-parser';
import React, { FC, memo } from 'react';
import {
  atom,
  atomFamily,
  selectorFamily,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import styled from 'styled-components';
import { gridAreasState } from './gridAreasState';
import { gridCssState } from './gridCssState';

export const GridAreas: FC = memo(() => {
  const gridCss = useRecoilValue(gridCssState);

  const gridAreas = useRecoilValue(gridAreasState);
  return (
    <Grid style={gridCss}>
      {gridAreas?.map((area, i) => {
        return <GridArea key={i} {...area} index={i} />;
      })}
    </Grid>
  );
});
GridAreas.displayName = 'GridAreas';
export type GridAreaObject = {
  gridArea: string;
  row: Track;
  column: Track;
  index?: number;
};
type GridAreaProps = BorderBoxProps & GridAreaObject;
/**
 * An atomFamily that stores the states for all Elements.
 *
 * https://recoiljs.org/docs/api-reference/utils/atomFamily
 */
export const elementState = atomFamily<BorderBoxProps, number>({
  key: 'element',
  default: {
    borderColor: 'blue.6',
    borderWidth: '2px',
    color: 'bg.grayLight',
    bg: 'blue.4',
  },
});
/**
 * An atom that stores which Element is currently selected.
 */
export const selectedElementIdsState = atom<[start?: number, end?: number]>({
  key: 'selectedElementId',
  default: [],
});
/**
 * A selector that returns the selected Element's state.
 */
export const selectedElementState = selectorFamily<GridAreaProps, number>({
  key: 'selectedElement',
  get: (id) => ({ get }) => {
    const ids = get(selectedElementIdsState);
    const state = get(gridAreasState)?.[id];
    if (ids.includes(id)) {
      return { ...state, bg: 'yellow.4' };
    }
    return state;
  },
});
/**
 * A selectorFamily that returns true if the provided
 * Element is currently selected.
 *
 * https://recoiljs.org/docs/api-reference/utils/selectorFamily
 */
export const isSelectedState = selectorFamily({
  key: 'isSelected',
  get: (id: number) => ({ get }) => {
    const selectedElementIds = get(selectedElementIdsState);
    return selectedElementIds.includes(id);
  },
});
const GridArea: FC<GridAreaProps> = memo(({ index }) => {
  const { row, column, ...boxProps } = useRecoilValue(
    selectedElementState(index)
  );
  const selected = useRecoilValue(selectedElementIdsState);
  const setSelectedElement = useSetRecoilState(selectedElementIdsState);
  const isSelected = useRecoilValue(isSelectedState(index));
  const [start] = selected;

  return (
    <GridAreaStyled
      isSelected={isSelected}
      selected={selected}
      onClick={(event) => {
        if (event.target === event.currentTarget)
          if (!start && !isSelected) return setSelectedElement([index]);
        if (selected[0] === index) return setSelectedElement([]);
        if (selected.length >= 1)
          return () => setSelectedElement(([first]) => [first, index]);
      }}
      {...boxProps}
    >
      <small>{JSON.stringify({ row, column }, null, 3)}</small>
    </GridAreaStyled>
  );
});
GridArea.displayName = 'GridArea';
type GridAreaStyledProps = FC<
  GridAreaProps & {
    selected: [start?: number, end?: number];
    isSelected: boolean;
  }
>;
const GridAreaStyled = styled<GridAreaStyledProps>(BorderBox)(
  ({ gridArea, selected: [start], isSelected, theme }) => ({
    gridArea,
    ':hover': {
      backgroundColor:
        typeof start === 'number' && !isSelected && theme.colors.yellow[2],
      borderColor:
        typeof start === 'number' && !isSelected && theme.colors.yellow[5],
    },
  })
);
GridAreaStyled.defaultProps = {
  borderColor: 'blue.6',
  borderWidth: '2px',
  color: 'bg.grayLight',
  bg: 'blue.4',
  borderRadius: 0,
};
GridArea.defaultProps = {};
export type GridControlsKey = keyof Pick<GridState, 'rows' | 'columns'>;
