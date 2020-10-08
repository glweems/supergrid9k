import { Entry } from 'css-grid-template-parser';
import { GridState } from './GridState';

export type CreateGridAreasArray = (
  rows: GridState['gridTemplateRows'],
  columns: GridState['gridTemplateColumns']
) => {
  id: string;
  row: Entry;
  column: Entry;
  rowStart: number;
  columnStart: number;
}[];

const createGridAreasArray: CreateGridAreasArray = (
  rows: GridState['gridTemplateRows'],
  columns: GridState['gridTemplateColumns']
) => {
  const items = [];

  rows.forEach((row, rowIndex) => {
    columns.forEach((column, columnIndex) => {
      const rowStart = rowIndex + 1;
      const columnStart = columnIndex + 1;
      items.push({
        row,
        column,
        rowStart,
        columnStart,
        id: `${rowStart}.${columnStart}`,
      });
    });
  });

  return items;
};

export default createGridAreasArray;
