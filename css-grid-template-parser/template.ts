import { Grid } from './types';
/**
 * Matching area
 * @param areas
 * @param row
 * @param column
 * @returns
 */
export function matchingArea(
  areas: Grid['areas'],
  row: number,
  column: number
) {
  return (area: string) =>
    areas[area].row.start <= row + 1 &&
    areas[area].row.end > row + 1 &&
    areas[area].column.start <= column + 1 &&
    areas[area].column.end > column + 1;
}
/**
 * Gets columns
 * @param areas
 * @param grid
 * @param row
 * @param [current]
 * @param [cols]
 * @returns columns
 */
export function getColumns(
  areas: string[],
  grid: Grid,
  row: number,
  current = 0,
  cols = ''
): string {
  const area = areas.find(matchingArea(grid.areas, row, current));

  cols += typeof area === 'string' ? area : '.';

  if (current < grid.width - 1) {
    return getColumns(areas, grid, row, current + 1, `${cols} `);
  }

  return cols;
}
/**
 * Gets rows
 * @param areas
 * @param grid
 * @param [current]
 * @param [rows]
 * @returns rows
 */
function getRows(
  areas: Array<string>,
  grid: Grid,
  current = 0,
  rows = ''
): string {
  rows += `"${getColumns(areas, grid, current)}"`;

  if (current < grid.height - 1) {
    return getRows(areas, grid, current + 1, `${rows}\n`);
  }

  return rows;
}

// export function getRowsConfig(areas: string[], current = 0, rows = '') {}

/**
 *
 * @param grid
 * @example
 * const areas = template({
  width: 5,
  height: 4,
  areas: {
    a: {
      column: { start: 1, end: 4, span: 3 },
      row: { start: 1, end: 3, span: 2 },
    },
    b: {
      column: { start: 3, end: 6, span: 3 },
      row: { start: 3, end: 5, span: 2 },
    },
  },
})

// → `"a a a . ."
//    "a a a . ."
//    ". . b b b"
//    ". . b b b"`
 */
export default function template(grid: Grid): string {
  return getRows(Object.keys(grid.areas), grid);
}
