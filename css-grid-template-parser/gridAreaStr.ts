import { GridAreaStr } from '../Grid/typedString';
import { Area } from './types';

export default function gridAreaStr({ row, column }: Area): GridAreaStr {
  return [row.start, column.start, row.end, column.end].join(
    ' / '
  ) as GridAreaStr;
}
