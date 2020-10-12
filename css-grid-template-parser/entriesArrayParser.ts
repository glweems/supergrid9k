import {
  Entry,
  GridState,
  RawGridState,
  TemplateStringObjKey,
  Unit,
} from './types';

export function auditEntry({ amount, unit }: Entry): Entry {
  const returnAmt = amount === '' ? 1 : amount;
  switch (unit) {
    case 'auto':
      return { amount: '', unit };

    default:
      return { amount: returnAmt, unit };
  }
}

export function transformTemplateEntry({ amount, unit }: Entry): string {
  switch (unit) {
    case 'auto':
      return unit;

    default:
      return amount + unit;
  }
}

export function transformTemplateStr(str?: string): Entry {
  const num = str?.match(/\d+/g);
  const unit = str?.match(/[a-zA-Z]+/g)?.[0] as Unit;
  switch (unit) {
    case 'auto':
      return {
        amount: '',
        unit,
      };
    default: {
      return {
        amount: parseInt(num?.[0]) ?? '',
        unit,
      };
    }
  }
}

/**
 * Entries array parser
 * @param str
 * @returns array parser
 */
export default function entriesArrayParser(
  str?: RawGridState[TemplateStringObjKey]
): Entry[] {
  if (!str) return [];
  const arr = String(str)?.split(' ');
  return arr?.map(transformTemplateStr);
}
