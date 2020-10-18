import { atom } from 'recoil';
import { GridState } from 'css-grid-template-parser';

export const gridState = atom<GridState | null>({ key: '', default: null });
export type GridControlsKey = 'rows' | 'columns';
