import { omit } from 'lodash';
import theme, { arrayColors } from './theme';

export function random<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const colorArray = Object.keys(omit(arrayColors, 'gray', 'orange'));

export const randomColor = (opacity = 5) =>
  theme.colors[random(colorArray)][opacity];
