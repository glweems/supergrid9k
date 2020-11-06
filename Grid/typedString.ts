import { arrayColors } from "../lib/theme";
import { GridControlObjKey } from "./GridControlId";
type ColorArrayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
/* eslint-disable prettier/prettier */
/* prettier-ignore */
export type SelectedControlId = `${GridControlObjKey}.${number}`;
export type GridAreaStr =`${/* rowStart */number} / ${number} / ${number} / ${number}`
export type ArrayColorProps = {
  [K in keyof typeof arrayColors]: `${K}.${ColorArrayIndex}`
}
