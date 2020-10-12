import { Properties } from 'csstype';
import { Entry, Unit } from './types';

type GridProperty = 'gridTemplateRows' | 'gridTemplateColumns' | 'gridGap';

/**
 *
 * Templates string paser
 * @param [str]
 * @returns string paser
 */
export default function templateStringParser(
  str?: Properties[GridProperty]
): Entry[] {
  if (!str) return [];
  const arr = str?.split(' ');
  return arr?.map((val) => {
    const num = val.match(/\d+/g);
    return {
      amount: num?.[0] ? parseInt(num[0]) : null,
      unit: val.match(/[a-zA-Z]+/g)[0] as Unit,
    };
  });
}
