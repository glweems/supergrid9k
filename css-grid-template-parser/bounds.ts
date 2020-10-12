import { Grid } from './types';

function find(
  fn: (...args: number[]) => number,
  direction: 'row' | 'column',
  extremum: 'start' | 'end',
  { areas }: Grid
): number {
  return fn(
    ...Object.keys(areas).map((cell) => areas[cell][direction][extremum])
  );
}

/**
 * Mins column start
 * @param grid
 * @returns column start
 */
export function minColumnStart(grid: Grid): number {
  return find(Math.min, 'column', 'start', grid);
}

/**
 * Maxs column start
 * @param grid
 * @returns column start
 */
export function maxColumnStart(grid: Grid): number {
  return find(Math.max, 'column', 'start', grid);
}

/**
 * Mins row start
 * @param grid
 * @returns row start
 */
export function minRowStart(grid: Grid): number {
  return find(Math.min, 'row', 'start', grid);
}

/**
 * Maxs row start
 * @param grid
 * @returns row start
 */
export function maxRowStart(grid: Grid): number {
  return find(Math.max, 'row', 'start', grid);
}

/**
 * Mins column end
 * @param grid
 * @returns column end
 */
export function minColumnEnd(grid: Grid): number {
  return find(Math.min, 'column', 'end', grid);
}

/**
 * Maxs column end
 * @param grid
 * @returns column end
 */
export function maxColumnEnd(grid: Grid): number {
  return find(Math.max, 'column', 'end', grid);
}

/**
 * Mins row end
 * @param grid
 * @returns row end
 */
export function minRowEnd(grid: Grid): number {
  return find(Math.min, 'row', 'end', grid);
}

/**
 * Maxs row end
 * @param grid
 * @returns row end
 */
export function maxRowEnd(grid: Grid): number {
  return find(Math.max, 'row', 'end', grid);
}
