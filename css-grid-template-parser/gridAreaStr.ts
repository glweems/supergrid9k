import { Area } from './types';

export default function gridAreaStr({ row, column }: Area): string {
  return [row.start, column.start, row.end, column.end].join(' / ');
}
