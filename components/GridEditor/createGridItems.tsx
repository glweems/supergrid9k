import { GridState } from '../../css-grid-template-parser/GridState';
import { GridItemProps } from './GridItem';

export type CreateGridAreasArray = (
  rows: GridState['rows'],
  columns: GridState['columns']
) => GridItemProps[];

const createGridAreasArray: CreateGridAreasArray = (
  rows: GridState['rows'],
  columns: GridState['columns']
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
