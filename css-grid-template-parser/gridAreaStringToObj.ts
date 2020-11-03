import { GridAreaStr } from '../Grid/typedString';
import { track } from './primitives';
import { Area } from './types';

export default function gridAreaStrToObj(gridArea: GridAreaStr): Area {
  const [rowStart, columnStart, rowEnd, columnEnd] = gridArea.split(' / ');

  return {
    row: track(Number(rowStart), Number(rowEnd)),
    column: track(Number(columnStart), Number(columnEnd)),
  };
}
