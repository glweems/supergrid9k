import { Area, Rect, Track } from './types';

export function track(start: number, end: number): Track {
  return {
    start,
    end,
    span: end - start,
  };
}

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
