import template from './template';
import { Area } from './types';

const areasOverlap = (bounds: Area, target: Area) =>
  template({
    width: bounds.row.span,
    height: bounds.column.span,
    areas: { t: target, b: bounds },
  })
    .replace(/["]+/g, '')
    .split('\n')
    .flatMap((rowStr) => rowStr.split(' '))
    .some((a) => a === 't');

export default areasOverlap;
