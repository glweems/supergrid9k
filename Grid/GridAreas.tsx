import { BorderBoxProps } from '@primer/components';
import BorderBox from '@primer/components/lib/BorderBox';
import Grid from '@primer/components/lib/Grid';
import Text from '@primer/components/lib/Text';
import { Area, GridState, track, Track } from 'css-grid-template-parser';
import React, { FC, useMemo } from 'react';
import {
  atom,
  atomFamily,
  selectorFamily,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import styled from 'styled-components';
import { GridAreaInner } from './GridAreaInner';
import { gridAreasState } from './gridAreasState';
import { gridCssState } from './gridCssState';
import { gridState } from './gridState';

export const GridAreas: FC = () => {
  const gridCss = useRecoilValue(gridCssState);

  const gridAreas = useRecoilValue(gridAreasState);
  return (
    <Grid style={gridCss}>
      {gridAreas?.map((area, i) => {
        return <GridArea key={i} {...area} index={i} />;
      })}
    </Grid>
  );
};
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
 * An atom that stores which Element is currently selectedIds.
 */
export const selectedElementIdsState = atom<SelectedIds>({
  key: 'selectedElementId',
  default: [],
});

/**
 * A selector that returns the selectedIds Element's state.
 */
export const selectedAreaState = selectorFamily<GridAreaObject, number>({
  key: 'selectedElement',
  get: (id) => ({ get }) => {
    // const ids = get(selectedElementIdsState);
    return get(gridAreasState)?.[id];
  },
});
/**
 * A selectorFamily that returns true if the provided
 * Element is currently selectedIds.
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

const tempAreaState = selectorFamily<Area, SelectedIds>({
  key: 'tempArea',
  get: (ids) => ({ get }) => {
    if (typeof ids?.[0] !== 'number' && typeof ids?.[1] !== 'number')
      return null;
    const [start, end] = ids.sort((a, b) => a - b);

    const startState = get(selectedAreaState(start));
    const endState = get(selectedAreaState(end));
    const temp: Area = {
      row: track(startState?.row.start, endState?.row.end),
      column: track(startState?.column.start, endState?.column.end),
    };

    return temp;
  },
});

export const currentEditingAreaNameState = atom<string>({
  key: 'currenEditingAreaName',
  default: null,
});

const GridArea: FC<GridAreaProps> = ({ index, style }) => {
  const { row, column, gridArea } = useRecoilValue(selectedAreaState(index));
  const isArea = gridArea !== '.';
  const [editName, setEditName] = useRecoilState(currentEditingAreaNameState);
  const isDisabled = !!editName && editName !== gridArea;
  const selectedIds = useRecoilValue(selectedElementIdsState);
  const [start, end] = selectedIds;
  const hasStarted = typeof start === 'number';
  const startArea = useRecoilValue(selectedAreaState(start));
  const endArea = useRecoilValue(selectedAreaState(end));
  const isChildArea = useMemo(
    () => () =>
      (row?.start > startArea?.row?.start && index <= end) ||
      (column?.end > endArea?.column?.end && index <= end),
    [
      column?.end,
      end,
      endArea?.column?.end,
      index,
      row?.start,
      startArea?.row?.start,
    ]
  );

  /*   ; */
  const setSelectedIds = useSetRecoilState(selectedElementIdsState);
  const isSelected = useRecoilValue(isSelectedState(index));
  const tempArea = useRecoilValue(tempAreaState([start, end]));
  const [grid, setGrid] = useRecoilState(gridState);

  const handlePointerDown: Handler = (_e) => {
    if (editName) return;
    switch (start) {
      case undefined:
        return setSelectedIds([index]);
      case start:
        return setSelectedIds([]);
      default:
        return;
    }
  };
  const handlePointerEnter: Handler = (_e) => {
    if (editName) return;
    if (hasStarted) return setSelectedIds(([start]) => [start, index]);
  };

  const handlePointerUp: Handler = (_e) => {
    if (editName) return;
    if (typeof start === 'number' && typeof end === 'number') {
      setGrid((prev) => ({
        ...prev,
        areas: { ...prev.areas, temp: tempArea },
      }));
      setEditName('temp');
    }
    setSelectedIds([]);
  };

  return (
    <GridAreaStyled
      index={index}
      isSelected={isSelected}
      selectedIds={selectedIds}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerEnter={handlePointerEnter}
      gridArea={gridArea}
      hasStarted={hasStarted}
      isAreaChild={isChildArea}
      isDisabled={isDisabled}
      style={style}
    >
      {isChildArea && <Text color="black">child</Text>}
      {gridArea}
      {isArea ? 'isArea' : 'notArea'}
      <GridAreaInner index={index} gridArea={gridArea} />
    </GridAreaStyled>
  );
};

type SelectedIds = [start?: number, end?: number];

type GridAreaStyledProps = GridAreaObject & {
  selectedIds: SelectedIds;
  isSelected: boolean;
  isAreaChild: boolean;
  hasStarted: boolean;
} & BorderBoxProps &
  Record<string, any>;

const GridAreaStyled = styled<FC<GridAreaStyledProps>>(
  BorderBox as FC<GridAreaStyledProps>
)(
  ({
    gridArea,
    selectedIds,
    isSelected,
    theme,
    index,
    isAreaChild,
    hasStarted,
    isDisabled,
  }) => ({
    gridArea,
    opacity: isDisabled ? 0.75 : 1,
    backgroundColor: selectedIds.includes(index)
      ? theme.colors.green[4]
      : hasStarted
      ? '#fff'
      : theme.colors.blue[4],
    borderColor: selectedIds.includes(index)
      ? theme.colors.green[5]
      : theme.colors.blue[5],
    ':hover': {
      backgroundColor: hasStarted && !isSelected && theme.colors.yellow[2],
      borderColor: hasStarted && !isSelected && theme.colors.yellow[5],
    },
    userSelect: 'none',
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
type Handler = React.PointerEventHandler<HTMLDivElement>;
