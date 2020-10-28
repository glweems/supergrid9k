import { Area } from '../css-grid-template-parser/types';

export default function gridAreaStr({ row, column }: Area): string {
  return [row.start, column.start, row.end, column.end].join(' / ');
}
