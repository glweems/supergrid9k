import { Entry } from 'css-grid-template-parser';
import { GridControlUnit } from './utils';

/**
 * Grids template parser
 * @param str string
 * @returns GridTemplateEntry[]
 */
export default function gridTemplateParser(str: string): Entry[] {
  if (!str) return [];
  const arr = str?.split(' ');
  return arr?.map((val) => {
    const num = val.match(/\d+/g);
    return {
      amount: num?.[0] ? parseInt(num[0]) : null,
      unit: val.match(/[a-zA-Z]+/g)[0] as GridControlUnit,
    };
  });
}
