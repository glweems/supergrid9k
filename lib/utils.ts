import { InputProps } from '@rebass/forms/styled-components';
import { RawGridState } from 'css-grid-template-parser';
import { SelectProps } from '../components/Select';
import { GridTemplateEntry } from '../store/grid';

export function replaceItemAtIndex<T = Record<string, unknown>>(
  arr: T[],
  index: number,
  newValue: T
) {
  return [...arr?.slice(0, index), newValue, ...arr?.slice(index + 1)];
}

export function removeItemAtIndex<T = Record<string, unknown>>(
  arr: T[],
  index: number
) {
  return [...arr?.slice(0, index), ...arr?.slice(index + 1)];
}

export type TypeValue =
  | 'array'
  | 'object'
  | 'function'
  | 'string'
  | 'number'
  | 'asyncfunction'
  | 'promise'
  | 'undefined';

export const toType = (obj: unknown): TypeValue =>
  ({}.toString
    .call(obj)
    .match(/\s([a-zA-Z]+)/)[1]
    .toLowerCase());

export function templateGenerator<T extends Record<string, unknown>>(
  strings: TemplateStringsArray,
  ...keys: Array<keyof T>
) {
  return function (data: T) {
    const template = strings.slice();

    keys.forEach((key, i) => {
      template[i] = template[i] + data[key];
    });

    return template.join('');
  };
}

/**
 * @param {string} name
 * @returns string
 * @example prettyName("gridTemplateRows") // returns "Grid Rows"
 */
export function prettyControlName(name: string): string {
  if (!name) return '';
  return name
    .split('grid')
    .join('')
    .split('Template')
    .join('')
    .replace(/(?:^|\s)\S/g, function (a) {
      return a.toUpperCase();
    });
}

export const groupRepeatedUnits = (
  templateUnitArray: Pick<GridTemplateEntry, 'amount' | 'unit'>[]
) => {
  const templateArray = templateUnitArray.map((i) => i['amount'] + i['unit']);
  const groups = [[templateArray.shift() as string]];
  for (const templateUnit of templateArray) {
    const lastGroup = groups[groups.length - 1];
    if (lastGroup.indexOf(templateUnit) !== -1) {
      lastGroup.push(templateUnit);
    } else {
      groups.push([templateUnit]);
    }
  }
  return groups;
};

export const createRepetition = (groups: string[][], maxRepetition = 1) => {
  return groups
    .map((group) =>
      // If you want to add repetition only when a measure is repeated more than x times,
      // change maxRepetition value to x
      group.length === maxRepetition
        ? group.join(' ')
        : `repeat(${group.length}, ${group[0]})`
    )
    .join(' ');
};

export function repeatStr(
  entries: Pick<GridTemplateEntry, 'amount' | 'unit'>[]
) {
  return createRepetition(groupRepeatedUnits(entries));
}
export type GridControlUnit =
  | 'fr'
  | '%'
  | 'px'
  | 'vw'
  | 'vh'
  | 'em'
  | 'rem'
  | 'auto';
export const gridUnits: GridControlUnit[] = [
  'fr',
  '%',
  'px',
  'vw',
  'vh',
  'em',
  'rem',
  'auto',
];

export type GridTemplateUnit = typeof gridUnits[number];

export const gridGapUnits = ['px', 'rem', 'em', 'vh', 'vw'];

export const defaultInputProps: InputProps = {
  disabled: false,
  type: 'number',
  min: 0,
  autoComplete: 'off',
  step: 0.25,
};

export const defaultSelectProps: SelectProps = {
  name: 'unit',
  disabled: false,
  options: gridUnits,
};

export function dataToCss(
  entries: Pick<GridTemplateEntry, 'amount' | 'unit'>[]
) {
  return entries
    ?.map(({ amount, unit }) => `${amount}${unit}`)
    .toString()
    .split(',')
    .join(' ');
}

export function createCssString(
  entries: Pick<GridTemplateEntry, 'amount' | 'unit'>[],
  repeat = false
): string {
  if (repeat) return repeatStr(entries);
  return dataToCss(entries);
}

export const defaultGridState: RawGridState = {
  name: 'Template',
  gridTemplateColumns: '1fr 1fr 1fr',
  gridTemplateRows: '1fr 1fr 1fr',
  gridGap: '10px 10px',
  useCssRepeatFn: false,
  gridContainerClassName: 'grid',
  areas: {
    one: {
      row: { start: 1, end: 2, span: 1 },
      column: { start: 1, end: 2, span: 1 },
    },
  },
};

export function omit<T = Record<string, unknown>>(
  obj: T,
  ...keys: Array<keyof T>
) {
  const newObj = { ...obj };
  keys.forEach((key) => {
    delete newObj[key];
  });
  return newObj;
}
