import { Area, Rect, Track } from './types';
/**
 * track
 * @param start number
 * @param end number
 */
export function track(start: number, end?: number): Track {
  if (!end) return { start, end: start, span: 1 };
  const track: Track = {
    start,
    end,
    span: end - start,
  };
  return track;
}
/**
 * area
 * @param rect Rect
 * @example
 // returns { row: { start: 1, end: 1, span: 1 } }
 area({
  x: 1,
  y: 1,
  height: 1,
  width: 1,
});
 */
export function area(rect: Rect): Area {
  const { x = 0, y = 0, width = 0, height = 0 } = rect;
  return {
    column: track(x + 1, x + width + 1),
    row: track(y + 1, y + height + 1),
  };
}

export function rect(area: Area): Rect {
  const { column, row } = area;
  return {
    x: column.start - 1,
    y: row.start - 1,
    width: column.end - column.start,
    height: row.end - row.start,
  };
}
