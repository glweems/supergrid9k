import template from './template';
import { Area } from './types';

export default function isInGridArea(bounds: Area, target: Area): boolean {
  const idk = template({
    width: bounds.column.span,
    height: bounds.column.span,
    areas: { b: bounds, t: target },
  });

  return (
    bounds.row.start <= target.row.start + 1 ||
    bounds.row.end > target.row.end + 1 ||
    bounds.column.start <= target.column.start + 1 ||
    bounds.column.end > target.column.end + 1
  );
}
