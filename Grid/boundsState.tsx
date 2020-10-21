import {
  maxColumnEnd,
  maxColumnStart,
  maxRowEnd,
  maxRowStart,
  minRowEnd,
  minRowStart,
} from 'css-grid-template-parser';
import { selector } from 'recoil';
import { gridState } from './gridState';

export const boundsState = selector({
  key: 'dragBoundaries',
  get: ({ get }) => {
    const grid = get(gridState);
    if (!grid) return;
    const { rows, columns, areas } = grid;

    const gridObj = {
      width: columns.length,
      height: rows.length,
      areas,
    };

    return {
      row: {
        start: { min: minRowStart(gridObj), max: maxRowStart(gridObj) },
        end: { min: minRowEnd(gridObj), max: maxRowEnd(gridObj) },
      },
      column: {
        start: { min: maxColumnStart(gridObj), max: maxColumnStart(gridObj) },
        end: { min: maxColumnEnd(gridObj), max: maxColumnEnd(gridObj) },
      },
    };
  },
});
