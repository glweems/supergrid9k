/* prettier-ignore */
/* eslint-disable */
import { Entry, GridState } from '../css-grid-template-parser/types';
type GridControlProperty = keyof Entry;

export type GridControlObjKey = keyof Pick<GridState,'rows'|'columns'>

export type GridControlId = GridControlObjKey | `${GridControlObjKey}.${number}` |	`${GridControlObjKey}.${number}.${GridControlProperty}`;