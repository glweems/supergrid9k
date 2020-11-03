import { CommonProps } from '@primer/components';
import { CSSSelectorObject, SystemStyleObject } from '@styled-system/css';
import { Area } from 'css-grid-template-parser';
import { omit } from 'lodash';
import { atom, atomFamily, selector, selectorFamily } from 'recoil';
import { gridCssState } from './gridCssState';
import { gridState, SelectedControlId } from './gridState';
import { GridAreaStr } from './typedString';

export const gridAreasArrayState = selector<string[]>({
  key: 'gridAreas',
  get: ({ get }) => {
    const grid = get(gridState);
    if (!grid) return [];
    return Object.keys(grid.areas);
  },
});

export const gridEntriesState = selector({
  key: 'griedEntries',
  get: ({ get }) => {
    const grid = get(gridState);

    if (!grid) return;
    const { rows, columns } = grid;
    const gridObj = {
      width: columns.length,
      height: rows.length,
    };

    const entries = new Array(gridObj.height).map((_, rowIndex) => {
      return [];
    });

    return get(gridCssState)
      ?.gridTemplateAreas.replace(/["]+/g, '')
      .split('\n')
      .flatMap(
        (rowStr, rowStart) =>
          rowStr.split(' ').reduce((pV, cV, cI) => {
            return [...pV, [rowStart + 1, cI + 1]];
          }, [])
        // .filter(([, , str]) => str === '.')
      );
  },
});

export const areaState = selectorFamily<Area, string>({
  key: 'area',
  get: (name) => ({ get }) => {
    return get(gridState)?.areas[name];
  },

  set: (name) => ({ set }, newValue) => {
    if (!newValue)
      return set(gridState, (prev) => ({
        ...prev,
        areas: omit(prev.areas, name),
      }));

    return set(gridState, (prev) => ({
      ...prev,
      areas: {
        ...prev.areas,
        [name]: {
          ...prev.areas[name],
          ...newValue,
        },
      },
    }));
  },
});

export const entryState = atomFamily<Area, [row: number, column: number]>({
  key: 'element',
  default: ([row, column]) => {
    return {
      row: { start: row, end: row + 1, span: 1 },
      column: { start: column, end: column + 1, span: 1 },
    };
  },
});

export const selectedAreaNameState = atom<GridAreaStr>({
  key: 'selectedAreaName',
  default: null,
});

export const selectedAreasState = atom<
  [start: GridAreaStr, end?: GridAreaStr] | null
>({
  key: 'selectedAreasName',
  default: null,
});

export function shouldHighlight(
  row: number,
  column: number,
  selectedIds: SelectedControlId[],
  _hover?: 'rows' | 'columns' | 'delete'
) {
  let highlight: 'rows' | 'columns' = null;
  selectedIds.forEach((str) => {
    const [type, value] = str.split('.');
    if (type === 'rows' && Number(value) === row - 1) highlight = 'rows';
    if (type === 'columns' && Number(value) === column - 1)
      highlight = 'columns';
  });
  return highlight;
}
/* {
          const area: Area = {
            row: track(rowStart + 1, rowStart + 2),
            column: track(colStart + 1, colStart + 2),
          };

          return {
            ...area,
            name,
            gridArea: gridAreaStr(area),
            style: { zIndex: 1 },
          }; */
