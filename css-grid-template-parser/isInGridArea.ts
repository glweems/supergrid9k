import { Area } from './types';

export default function isInGridArea(bounds: Area, target: Area): boolean {
  if (target.row.start >= bounds.row.start) return false;
  if (target.row.end >= bounds.row.end) return false;
  if (target.column.start >= bounds.column.start) return true;
  if (target.column.end >= bounds.column.end) return false;
  return true;
}
