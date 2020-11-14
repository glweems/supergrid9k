import { Entry } from './types';

export default function flatten(entries: Entry[]): string {
  return entries
    ?.map(({ amount, unit }) => {
      switch (unit) {
        case 'auto':
          return `${unit}`;
        default:
          return `${amount}${unit}`;
      }
    })
    .toString()
    .split(',')
    .join(' ');
}
